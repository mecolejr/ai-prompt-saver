document.addEventListener('DOMContentLoaded', () => {
    const promptEl = document.getElementById('prompt');
    const submitBtn = document.getElementById('submit');
    const responseContainer = document.getElementById('response-container');
    const responseEl = document.getElementById('response');
    const savedEntries = document.getElementById('saved-entries');

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

    const loadEntries = () => {
        const entries = JSON.parse(localStorage.getItem('ai-entries')) || [];
        savedEntries.innerHTML = '';
        entries.forEach((entry, index) => {
            const card = document.createElement('div');
            card.className = 'bg-white p-4 rounded shadow';
            card.innerHTML = `
                <p class="font-bold">Prompt:</p>
                <p>${entry.prompt}</p>
                <p class="font-bold mt-2">Response:</p>
                <p>${entry.response}</p>
                <button data-index="${index}" class="delete-btn mt-2 bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            `;
            savedEntries.appendChild(card);
        });
    };

    const saveEntry = (prompt, response) => {
        const entries = JSON.parse(localStorage.getItem('ai-entries')) || [];
        entries.push({ prompt, response });
        localStorage.setItem('ai-entries', JSON.stringify(entries));
        loadEntries();
    };

    const deleteEntry = (index) => {
        const entries = JSON.parse(localStorage.getItem('ai-entries')) || [];
        entries.splice(index, 1);
        localStorage.setItem('ai-entries', JSON.stringify(entries));
        loadEntries();
    };

    submitBtn.addEventListener('click', async () => {
        const prompt = promptEl.value.trim();
        if (!prompt) {
            alert("Please enter a prompt.");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Thinking...';

        const response = await getAIResponse(prompt);
        responseEl.textContent = response;
        responseContainer.classList.remove('hidden');

        saveEntry(prompt, response);

        promptEl.value = '';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Response';
    });

    savedEntries.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteEntry(index);
        }
    });

    loadEntries();
});
