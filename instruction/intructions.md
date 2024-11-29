# Project overview
Your goal is to create an enterprise portal for a company called, "Legal Veterans". The portal should allow users to upload documents and store them in a database, similar to how FileUploader.tsx works but uploading multiple PDFs. You will be using NextJS 14, shadcn, tailwind, Typescript, Lucid icon, Azure Blob Storage, and Azure Document Intelligence.

# Core functionalities
1. File upload of multiple PDFs to the portal.
- Allow a dropzone for users to upload PDFs.
- Store the PDFs in a database.
- Use Azure Blob Storage to store the PDFs.
2. Each uploaded PDF should be assessed by Azure Document Intelligence custom classifier.
- Server-side processing
- CUSTOM_CLASSIFIER_ID is "rdl"
- The DOCUMENT_INTELLIGENCE_API_KEY is stored in .env file
- CUSTOM_CLASSIFIER_TRAINING_DATA_SAS_URL is stored in .env file
3. Print the results to the console.

# Doc
1. Azure Document Intelligence custom classifier example:
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to programmatically build a custom classifier.
 *
 * The Document Intelligence service expects the training data to be organized and labeled according to a particular
 * convention and stored in an Azure Storage container. For more information about creating a training data set, please
 * see the information at the following link to the service's documentation:
 *
 * https://aka.ms/azsdk/documentitelligence/buildclassifiermodel
 *
 * @summary build a classifier from a training data set
 */

import DocumentIntelligence, { DocumentClassifierBuildOperationDetailsOutput, getLongRunningPoller, isUnexpected } from "@azure-rest/ai-document-intelligence";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" })

  const random = Date.now().toString();
  const modelId =
    (process.env.CUSTOM_CLASSIFIER_ID || "<classifier id>") + random.substring(random.length - 6);

  const trainingDataSasUrl1 =
    process.env.CUSTOM_CLASSIFIER_TRAINING_DATA_SAS_URL_1 || "<training data container SAS url 1>";

  const trainingDataSasUrl2 =
    process.env.CUSTOM_CLASSIFIER_TRAINING_DATA_SAS_URL_2 || "<training data container SAS url 2>";

  const initialResponse = await client.path("/documentClassifiers:build").post({
    body: {
      classifierId: modelId,
      description: "Custom classifier description",
      docTypes: {
        foo: {
          azureBlobSource: {
            containerUrl: trainingDataSasUrl1,
          },
        },
        bar: {
          azureBlobSource: {
            containerUrl: trainingDataSasUrl2,
          },
        },
      },
    }
  });

  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const poller = await getLongRunningPoller(client, initialResponse);
  const classifier = (
    (await (poller).pollUntilDone()).body as DocumentClassifierBuildOperationDetailsOutput
  ).result;
  if (!classifier) {
    throw new Error("Expected a DocumentClassifierDetailsOutput response.");
  }


  console.log("Classifier ID:", classifier.classifierId);
  console.log("Description:", classifier.description);
  console.log("Created:", classifier.createdDateTime);

  console.log("Document Types:");
  for (const [docType, details] of Object.entries(classifier.docTypes)) {
    console.log(`- Name: "${docType}", source: ${JSON.stringify(details, null, 2)}`);
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

Documentation of getting started with Azure Document Intelligence SDK:
Use Document Intelligence SDK in your applications
The Document Intelligence SDK enables the use and management of the Document Intelligence service in your application. The SDK builds on the underlying Document Intelligence REST API allowing you to easily use those APIs within your programming language paradigm. Here's how you use the Document Intelligence SDK for your preferred language:

1. Install the SDK client library
C#/.NET
Java
JavaScript
Python
Console

Copy
npm i @azure-rest/ai-document-intelligence version 1.0.0-beta.3
2. Import the SDK client library into your application
C#/.NET
Java
JavaScript
Python
JavaScript

Copy
const { AzureKeyCredential, DocumentIntelligence } = require("@azure-rest/ai-document-intelligence@1.0.0-beta.3");
3. Set up authentication
There are two supported methods for authentication:

Use a Document Intelligence API key with AzureKeyCredential from azure.core.credentials.

Use a token credential from azure-identity to authenticate with Microsoft Entra ID.

Use your API key
Here's where to find your Document Intelligence API key in the Azure portal:

Screenshot of the keys and endpoint location in the Azure portal.

 Important

We recommend Microsoft Entra ID authentication with managed identities for Azure resources to avoid storing credentials with your applications that run in the cloud.

If you use an API key, store it securely somewhere else, such as in Azure Key Vault. Don't include the API key directly in your code, and never post it publicly.

For more information about AI services security, see Authenticate requests to Azure AI services.

C#/.NET
Java
JavaScript
Python
JavaScript

Copy

// create your `DocumentIntelligenceClient` instance and `AzureKeyCredential` variable
async function main() {
    const client = DocumentIntelligence(process.env["your-endpoint>"], {
  key: process.env["<your-key>"],
});
Use a Microsoft Entra token credential
 Note

Regional endpoints do not support Microsoft Entra authentication. Create a custom subdomain for your resource in order to use this type of authentication.

Authorization is easiest using the DefaultAzureCredential. It provides a default token credential, based upon the running environment, capable of handling most Azure authentication scenarios.

C#/.NET
Java
JavaScript
Python
Here's how to acquire and use the DefaultAzureCredential for JavaScript applications:

Install the Azure Identity library for JavaScript:

JavaScript

Copy
npm install @azure/identity
Register a Microsoft Entra application and create a new service principal.

Grant access to Document Intelligence by assigning the Cognitive Services User role to your service principal.

Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra application as environment variables: AZURE_CLIENT_ID, AZURE_TENANT_ID, and AZURE_CLIENT_SECRET, respectively.

Create your DocumentIntelligenceClient instance including the DefaultAzureCredential:

JavaScript

Copy
const { DocumentIntelligenceClient } = require("@azure-rest/ai-document-intelligence@1.0.0-beta.2");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new DocumentIntelligenceClient("<your-endpoint>", new DefaultAzureCredential());
For more information, see Create and authenticate a client.


# Important Implementation Notes
1. Adding logs
- Always add server side logs to your code so we can debug any potential issues

2. Project setup
- All new components should be added in the components folder
- All shadcn components should be added in the ui folder in the components folder
- Use the Next.js 14 app router
- All data fetching should be done in a server component and pass the data down as props
- Client components (useState, hooks, etc) require the 'use client' is set at the top of the file

3. Environment variables
- All environment variables should be stored in the .env and .env.local files
- All environment variables should be used in the server components
- All environment variables should be used in the client components

4. Error handling and logging:
- Implement error handling and logging in the server components and client components
- Always add server side logs to your code so we can debug any potential issues
- Display user-friendly error messages to the client-side.

5. Type Safety:
- Use TypeScript to ensure type safety in your code.