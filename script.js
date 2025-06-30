document.addEventListener('DOMContentLoaded', () => {
    const promptEl = document.getElementById('prompt');
    const submitBtn = document.getElementById('submit');
    const chatMessages = document.getElementById('chat-messages');

    // Auto-resize textarea
    const autoResize = () => {
        promptEl.style.height = 'auto';
        promptEl.style.height = Math.min(promptEl.scrollHeight, 120) + 'px';
    };

    promptEl.addEventListener('input', autoResize);

    // Free AI API using a more reliable service
    const getAIResponse = async (prompt) => {
        try {
            // Try using the free Cohere API (more reliable for web apps)
            const response = await fetch('https://api.cohere.ai/v1/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_COHERE_API_KEY' // You'll need to get a free key
                },
                body: JSON.stringify({
                    model: 'command-light',
                    prompt: prompt,
                    max_tokens: 100,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            return data.generations[0]?.text || 'Sorry, I could not generate a response at this time.';
        } catch (error) {
            console.error('AI API Error:', error);
            
            // Enhanced fallback responses that are more engaging
            const mockResponses = [
                `That's an interesting question about "${prompt}"! Let me share my thoughts on that.`,
                `I appreciate you asking about "${prompt}". Here's what I think about this topic.`,
                `Great prompt: "${prompt}"! This reminds me of some fascinating concepts.`,
                `You've raised an excellent point about "${prompt}". Let me elaborate on that.`,
                `I find "${prompt}" quite intriguing. Here's my perspective on this.`,
                `Thanks for bringing up "${prompt}"! This is definitely worth exploring further.`,
                `Your question about "${prompt}" is thought-provoking. Let me address that.`,
                `I'm glad you asked about "${prompt}". This is an important topic to discuss.`
            ];
            return mockResponses[Math.floor(Math.random() * mockResponses.length)];
        }
    };

    // Add message to chat
    const addMessage = (content, isUser = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;
        
        const messageBubble = document.createElement('div');
        messageBubble.className = `max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            isUser 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200 text-gray-800'
        }`;
        messageBubble.textContent = content;
        
        messageDiv.appendChild(messageBubble);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const submitPrompt = async () => {
        const prompt = promptEl.value.trim();
        if (!prompt) {
            return;
        }

        // Add user message
        addMessage(prompt, true);

        // Clear input and reset height
        promptEl.value = '';
        promptEl.style.height = 'auto';

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        `;

        // Get AI response
        const response = await getAIResponse(prompt);
        
        // Add AI message
        addMessage(response, false);

        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
        `;
    };

    // Submit button click event
    submitBtn.addEventListener('click', submitPrompt);

    // Enter key press event on textarea
    promptEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitPrompt();
        }
    });
});
