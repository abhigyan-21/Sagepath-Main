# Lumora Chatbot Integration

This directory contains the source code for the Lumora Chatbot, a client-side WASM-based LLM chat interface.

## Components

- `index.jsx`: Main React component.
- `LLMClient.js`: Handles model loading, streaming, and fallback logic.
- `styles.css`: Styles for the chat widget.

## Configuration

### Model Hosting
To use a real WASM model:
1. Host the model binaries (GGUF or similar supported format) on a server that supports CORS and Range requests.
2. Update `MODEL_URL` in `LLMClient.js` to point to your hosted model.

### WASM Loader
The current implementation uses a mock loader for demonstration. To integrate a real WASM runtime (e.g., `web-llm` or `llama.cpp` WASM):
1. Include the WASM loader script in `index.html` or import it in `LLMClient.js`.
2. Implement `window.initWasmModel` or update `LLMClient.initModel` to call the actual loader API.

### Fallback
If the model fails to load (timeout or error), the client automatically switches to a fallback mode (currently simulated). Update `generateFallback` in `LLMClient.js` to call your hosted API endpoint.

## Testing
Run the unit tests for the LLMClient adapter:
```bash
node test_llm_client.js
```
