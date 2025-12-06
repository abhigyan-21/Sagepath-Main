/**
 * LLMClient.js
 * Handles interaction with the WASM model and fallback mechanisms.
 */

const MODEL_URL = "https://huggingface.co/TheBloke/Llama-2-7b-Chat-GGUF/resolve/main/llama-2-7b-chat.Q2_K.gguf"; // Example URL
const MAX_HISTORY = 6;

// Mock WASM loader if not present
if (!window.initWasmModel) {
    window.initWasmModel = async ({ modelUrl, onProgress }) => {
        console.log("Initializing Mock WASM Model...", modelUrl);
        let progress = 0;
        while (progress < 100) {
            await new Promise(r => setTimeout(r, 100)); // Simulate download
            progress += 5;
            onProgress(progress);
        }

        return {
            generate: async ({ prompt, onToken }) => {
                console.log("Generating response for:", prompt);
                const response = "This is a simulated response from the local Lumora model. I am running in your browser! ";
                const tokens = response.split(" ");
                for (const token of tokens) {
                    await new Promise(r => setTimeout(r, 100 + Math.random() * 50)); // Simulate generation time
                    onToken(token + " ");
                }
            }
        };
    };
}

class LLMClient {
    constructor() {
        this.model = null;
        this.isModelLoaded = false;
        this.isLoading = false;
        this.useFallback = false;
        this.history = [];
        this.sessionId = Date.now().toString();
    }

    loadHistory(userId) {
        const key = `lumora_chat_history_${userId}`;
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                this.history = JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse chat history", e);
                this.history = [];
            }
        }
    }

    saveHistory(userId) {
        const key = `lumora_chat_history_${userId}`;
        // Keep only last MAX_HISTORY turns (user + bot = 1 turn usually, but here just messages)
        // Actually turns = pairs. Let's limit messages.
        const limitedHistory = this.history.slice(-MAX_HISTORY * 2);
        localStorage.setItem(key, JSON.stringify(limitedHistory));
    }

    clearHistory(userId) {
        this.history = [];
        localStorage.removeItem(`lumora_chat_history_${userId}`);
    }

    async initModel(onProgress) {
        if (this.isModelLoaded) return;
        this.isLoading = true;

        try {
            // Timeout for download (90s)
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Model load timeout")), 90000)
            );

            const loadPromise = window.initWasmModel({
                modelUrl: MODEL_URL,
                onProgress: (p) => onProgress(p)
            });

            this.model = await Promise.race([loadPromise, timeoutPromise]);
            this.isModelLoaded = true;
            this.useFallback = false;
        } catch (error) {
            console.error("WASM Model load failed:", error);
            this.useFallback = true;
            // Fallback doesn't need explicit init usually, or we init the API client here
        } finally {
            this.isLoading = false;
        }
    }

    async sendMessage(text, context, onToken, onComplete) {
        // Add user message to history
        this.history.push({ role: "user", content: text });

        let fullResponse = "";

        try {
            if (this.useFallback) {
                await this.generateFallback(text, context, (token) => {
                    fullResponse += token;
                    onToken(token);
                });
            } else {
                if (!this.model) throw new Error("Model not initialized");

                // Construct Prompt
                const systemPrompt = "You are Lumora — a concise, helpful course tutor for SagePath. Always answer in simple, stepwise explanations targeted at undergraduate CS students. When possible, give one short intuitive explanation (1–2 sentences), then a short actionable example or code snippet (max 6 lines), and finally one suggested next step the student can try. If the user asks beyond the provided course context, say: 'I don't know that from this course — would you like a general explanation or to see course materials?' Do not produce copyrighted long verbatim content. Keep answers friendly, accurate, and avoid hallucination by prefacing uncertain statements with 'I might be wrong —'.";

                const contextStr = context ? `\nCONTEXT:\n${context}\n` : "";
                const historyStr = this.history.slice(0, -1).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join("\n");
                const prompt = `${systemPrompt}${contextStr}\n${historyStr}\nUser: ${text}\nAssistant:`;

                await this.model.generate({
                    prompt,
                    onToken: (token) => {
                        fullResponse += token;
                        onToken(token);
                    }
                });
            }
        } catch (error) {
            console.error("Generation failed:", error);
            onToken("\n[Error: Failed to generate response. Switching to fallback...]");
            this.useFallback = true;
            // Retry with fallback? For now just show error.
        }

        this.history.push({ role: "assistant", content: fullResponse });
        if (onComplete) onComplete();
    }

    async generateFallback(text, context, onToken) {
        // Simulated fallback to hosted API
        console.log("Using Fallback API for:", text);
        const response = "I am running on the hosted fallback service because the local model could not be loaded. ";
        const tokens = response.split(" ");
        for (const token of tokens) {
            await new Promise(r => setTimeout(r, 50));
            onToken(token + " ");
        }
    }
}

export const llmClient = new LLMClient();
