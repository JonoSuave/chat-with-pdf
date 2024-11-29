const { buildClassifier } = require('./azure-doc-intelligence');

async function testBuildClassifier() {
    try {
        console.log('Starting test...');
        const result = await buildClassifier();
        console.log('Build classifier result:', result);
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testBuildClassifier();
