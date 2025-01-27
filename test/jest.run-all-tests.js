/**
 * @fileoverview  Explicitly invokes test modules to ensure correct order.
 * 
 * Some end-to-end tests are dependent on the order of execution (initial migration, testing overwrites, testing existing assets)
*/
const { execSync } = require('child_process');

const testEnv = require('./end2end/test-env');
const resources = require('./resources');
const { run } = require('jest');

// Setup and teardown
async function runGlobalSetup_Async() {
    console.log('\nGLOBAL SETUP: START');
    await testEnv.setupNewSandboxCloud_Async();
    console.log('Downloading large video asset');
    await resources.createLargeVideoTestAsset_Async();
    console.log('GLOBAL SETUP: DONE\n');
};

async function runGlobalTeardown_Async() { 
    console.log('\nGLOBAL TEARDOWN: START');
    testEnv.teardown();
    console.log('Deleting large video asset');
    await resources.cleanupLargeVideoTestAsset_Async();
    console.log('GLOBAL TEARDOWN: DONE');
}

// Helper function to run tests from a path or module
function runTestsFrom(testPath) {
    execSync(`npx jest --verbose "${testPath}"`, {stdio: 'inherit'});
}


// Invoking tests
(async () => {
    try{
        await runGlobalSetup_Async();

        // It is assumed that all component tests are next to components
        // under the 'lib' folder
        runTestsFrom('./lib/');

        // Running end-to-end tests in order
        runTestsFrom('./test/end2end/tests/001-initial-migration.test.js');
        runTestsFrom('./test/end2end/tests/002-overwriting-enabled.test.js');
        runTestsFrom('./test/end2end/tests/003-overwriting-disabled.test.js');
    } catch (error) {
        console.error('Error running tests:', error);
    } finally {
        await runGlobalTeardown_Async();
    }
})();

