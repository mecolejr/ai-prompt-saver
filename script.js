document.addEventListener('DOMContentLoaded', () => {
    const promptEl = document.getElementById('prompt');
    const submitBtn = document.getElementById('submit');
    const responseContainer = document.getElementById('response-container');
    const responseEl = document.getElementById('response');
    const savedEntries = document.getElementById('saved-entries');

    const getAIResponse = async (prompt) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`This is a mock response to: "${prompt}"`);
            }, 1000);
        });
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
