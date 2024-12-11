import DocumentIntelligence, { AnalyzeResultOperationOutput, getLongRunningPoller, isUnexpected } from "@azure-rest/ai-document-intelligence";
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
import * as dotenv from "dotenv";
import { pages } from "next/dist/build/templates/app-page";
dotenv.config();

// Validate environment variables
if (!process.env.DOCUMENT_INTELLIGENCE_ENDPOINT) {
    throw new Error('DOCUMENT_INTELLIGENCE_ENDPOINT is not set in environment variables');
}
if (!process.env.DOCUMENT_INTELLIGENCE_KEY) {
    throw new Error('DOCUMENT_INTELLIGENCE_KEY is not set in environment variables');
}
if (!process.env.CUSTOM_CLASSIFIER_ID) {
    throw new Error('CUSTOM_CLASSIFIER_ID is not set in environment variables');
}
if (!process.env.CUSTOM_CLASSIFIER_TRAINING_DATA_SAS_URL) {
    throw new Error('CUSTOM_CLASSIFIER_TRAINING_DATA_SAS_URL is not set in environment variables');
}

const endpoint = process.env.DOCUMENT_INTELLIGENCE_ENDPOINT;
const apiKey = process.env.DOCUMENT_INTELLIGENCE_KEY;
const classifierId = process.env.CUSTOM_CLASSIFIER_ID;
const trainingDataUrl = process.env.CUSTOM_CLASSIFIER_TRAINING_DATA_SAS_URL;

console.log('Environment variables loaded:', {
    hasEndpoint: !!endpoint,
    hasApiKey: !!apiKey,
    hasClassifierId: !!classifierId,
    hasTrainingDataUrl: !!trainingDataUrl,
    endpoint: endpoint.substring(0, 20) + '...' // Only show part of the endpoint for security
});

export interface LayoutAnalysis {
    pages: {
        pageNumber: number;
        width: number;
        height: number;
        unit: string;
        words: number;
        lines: number;
        angle: number;
    }[];
    tables: {
        columnCount: number;
        rowCount: number;
        cellCount: number;
    }[];
    keyValuePairs: string[];
    queries?: {
        question: string;
        answers: string[];
    }[];
    decisions?: string[];
}

export interface DocumentAnalysis {
    docType: string;
    confidence: number;
    pageNumber?: number;
    layout?: LayoutAnalysis;
    decisions?: string[];
}

async function analyzeLayout(documentUrl: string): Promise<LayoutAnalysis> {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
    console.log('Starting layout analysis...');
    
    const poller = await client.beginAnalyzeDocument("prebuilt-layout", documentUrl, { pages: "1-2" }, { contentFormat: "markdown" });
    const result = await poller.pollUntilDone();

    // Extract decisions from paragraphs
    let isDecisionSection = false;
    const decisions: string[] = [];
    
    result.paragraphs.forEach((paragraph: any) => {
        // Check for DECISION section header
        if (paragraph.role === 'sectionHeading' && paragraph.content === 'DECISION') {
            isDecisionSection = true;
            console.log('Decision section found');
            return;
        }
        
        // End decision section if we hit another section heading
        if (paragraph.role === 'sectionHeading' && paragraph.content !== 'DECISION') {
            isDecisionSection = false;
            console.log('End of decision section');
            return;
        }
        
        // Skip page headers and page numbers
        if (paragraph.role === 'pageHeader' || paragraph.role === 'pageNumber') {
            console.log('Skipping page header or page number');
            return;
        }
        
        // Capture decision content if we're in the decision section and it's not a header/page number
        if (isDecisionSection && paragraph.content && !paragraph.role) {
            console.log('Found decision item paragraph:', paragraph);
            decisions.push(paragraph.content.trim());
        }
    });

    console.log('Extracted Decisions:', decisions);

    // Debug logs for main document components
    console.log('\n=== Document Structure Analysis ===');
    // console.log(`Document results: ${JSON.stringify(result, null, 2)}`);
    // console.log('Pages:', JSON.stringify(result.pages, null, 2));
    // console.log('Paragraphs:', JSON.stringify(result.paragraphs, null, 2));

    // Debug log to see the complete structure
    // console.log('Complete result structure:', JSON.stringify(result, null, 2));

    // console.log('Document Content Analysis:');
    result.pages.forEach((page: any, pageIndex: number) => {
        // console.log(`\nPage ${pageIndex + 1} structure:`, JSON.stringify(page, null, 2));
        // Try accessing spans or content directly
        // console.log('Content:', page.spans?.map((span: any) => span.content));
    });

    // console.log('\nKey-Value Pairs:');
    // result.keyValuePairs?.forEach((kvp: any, index: number) => {
    //     console.log(`${index + 1}. Key: "${kvp.key?.content}", Value: "${kvp.value?.content}"`);
    // });

    // console.log('\nQuery Results:', queryResults);

    // console.log('Layout analysis result:', queryResults);

    const layoutAnalysis: LayoutAnalysis = {
        pages: result.pages.map((page: { pageNumber: any; width: any; height: any; unit: any; words: string | any[]; lines: string | any[]; angle: any; }) => ({
            pageNumber: page.pageNumber,
            width: page.width,
            height: page.height,
            unit: page.unit,
            words: page.words.length,
            lines: page.lines.length,
            angle: page.angle
        })),
        tables: result.tables?.map((table: { columnCount: any; rowCount: any; cells: string | any[]; }) => ({
            columnCount: table.columnCount,
            rowCount: table.rowCount,
            cellCount: table.cells.length
        })) || [],
        keyValuePairs: result.keyValuePairs || [],
        queries: result.answers?.map((answer: any, index: number) => ({
            question: result.questions[index],
            answers: [answer]
        })) || [],
        decisions: decisions
    };

    console.log('Layout analysis completed:', layoutAnalysis);
    return layoutAnalysis;
}

async function buildClassifier(documentUrl: string): Promise<DocumentAnalysis> {
    try {
        console.log('Creating Document Intelligence client with endpoint:', endpoint.substring(0, 20) + '...');
        const client = DocumentIntelligence(endpoint, { key: apiKey });
        console.log('Client created successfully:', !!client);
        console.log('Client configuration:', {
            client,
        });

        console.log('Starting document classification...');
        const initialResponse = await client.path("/documentClassifiers/{classifierId}:analyze", classifierId).post({
            contentType: "application/json",
            body: {
                urlSource: documentUrl
            }
        });

        console.log('Initial response received:', initialResponse);

        if (isUnexpected(initialResponse)) {
            throw initialResponse.body.error;
        }

        const poller = await getLongRunningPoller(client, initialResponse);
        const analyzeResult = (
            (await poller.pollUntilDone()).body as AnalyzeResultOperationOutput
        ).analyzeResult;

        if (analyzeResult?.documents === undefined || analyzeResult.documents.length === 0) {
            throw new Error("Failed to extract any documents.");
        }

        const document = analyzeResult.documents[0];
        console.log(
            `Classified document as type '${document.docType}' on page ${document.boundingRegions?.[0].pageNumber} (confidence: ${document.confidence})`
        );

        const result: DocumentAnalysis = {
            docType: document.docType,
            confidence: document.confidence,
            pageNumber: document.boundingRegions?.[0].pageNumber
        };

        // If document is RDL, perform layout analysis
        if (document.docType.toLowerCase() === 'rdl') {
            console.log('RDL document detected, performing layout analysis...');
            const layoutAnalysis = await analyzeLayout(documentUrl);
            result.layout = layoutAnalysis;
            result.decisions = layoutAnalysis.decisions;
        }

        return result;

    } catch (error) {
        console.error('Error analyzing document:', error);
        throw error;
    }
}

export default buildClassifier;