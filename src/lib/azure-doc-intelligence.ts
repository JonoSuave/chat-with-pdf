import DocumentIntelligence, { AnalyzeResultOperationOutput, getLongRunningPoller, isUnexpected } from "@azure-rest/ai-document-intelligence";

import * as dotenv from "dotenv";
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

async function buildClassifier(documentUrl: string) {
    try {
        console.log('Creating Document Intelligence client with endpoint:', endpoint.substring(0, 20) + '...');
        const client = DocumentIntelligence(endpoint, { key: apiKey });
        console.log('Client created successfully:', !!client);
        console.log('Client configuration:', {
            client,
        });

        console.log('Starting classifier build operation...');

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
            (await (poller).pollUntilDone()).body as AnalyzeResultOperationOutput
          ).analyzeResult;
        
          if (analyzeResult?.documents === undefined || analyzeResult.documents.length === 0) {
            throw new Error("Failed to extract any documents.");
          }
        
          for (const document of analyzeResult.documents) {
            console.log(
              `Extracted a document with type '${document.docType}' on page ${document.boundingRegions?.[0].pageNumber} (confidence: ${document.confidence})`
            );
          }

    } catch (error) {
        console.error('Error building classifier:', error);
        throw error;
    }
}

export default buildClassifier;