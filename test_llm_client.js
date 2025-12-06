
import assert from 'assert';

// Mock Browser Environment
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; }
    };
})();

global.window = {
    initWasmModel: async ({ modelUrl, onProgress }) => {
        console.log("[Mock] initWasmModel called");
        onProgress(10);
        onProgress(100);
        return {
            generate: async ({ prompt, onToken }) => {
                console.log("[Mock] generate called with prompt length:", prompt.length);
                onToken("Test");
                onToken(" ");
                onToken("Response");
            }
        };
    }
};

global.localStorage = localStorageMock;

async function runTests() {
    // Import Client Dynamically to ensure globals are set
    const { llmClient } = await import('./src/components/LumoraChat/LLMClient.js');

    console.log("Starting LLMClient Tests...");

    // Test 1: Initialization
    console.log("Test 1: Initialization");
    assert.ok(llmClient, "Client should be instantiated");
    assert.strictEqual(llmClient.isModelLoaded, false);

    // Test 2: Model Loading
    console.log("Test 2: Model Loading");
    let progressUpdates = 0;
    await llmClient.initModel((p) => { progressUpdates++; });
    assert.strictEqual(llmClient.isModelLoaded, true, "Model should be loaded");
    assert.ok(progressUpdates > 0, "Should receive progress updates");

    // Test 3: Generation
    console.log("Test 3: Generation");
    let response = "";
    await llmClient.sendMessage("Hello", "Context", (token) => {
        response += token;
    });
    assert.strictEqual(response, "Test Response", "Should generate expected response");
    assert.strictEqual(llmClient.history.length, 2, "History should have 2 messages (User + Bot)");

    // Test 4: Persistence
    console.log("Test 4: Persistence");
    llmClient.saveHistory("test_user");
    const saved = localStorage.getItem("lumora_chat_history_test_user");
    assert.ok(saved, "History should be saved to localStorage");
    const parsed = JSON.parse(saved);
    assert.strictEqual(parsed.length, 2);

    // Test 5: Clear History
    console.log("Test 5: Clear History");
    llmClient.clearHistory("test_user");
    assert.strictEqual(llmClient.history.length, 0);
    assert.strictEqual(localStorage.getItem("lumora_chat_history_test_user"), null);

    console.log("All tests passed!");
}

runTests().catch(e => {
    console.error("Test Failed:", e);
    process.exit(1);
});
