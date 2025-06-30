# AI Prompt Saver

A simple web application that allows users to save and manage AI prompts and their responses. Built with vanilla JavaScript, HTML, and Tailwind CSS.

## Features

- ✨ **Clean, Modern UI**: Beautiful interface built with Tailwind CSS
- 💾 **Local Storage**: Automatically saves prompts and responses to browser storage
- 🗑️ **Entry Management**: View and delete saved entries
- ⚡ **Mock AI Integration**: Simulated AI responses for testing
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Screenshots

![AI Prompt Saver Interface](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=AI+Prompt+Saver+Interface)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/ai-prompt-saver.git
   cd ai-prompt-saver
   ```

2. Open `index.html` in your web browser:
   ```bash
   open index.html
   ```
   
   Or simply double-click the `index.html` file.

## Usage

1. **Enter a Prompt**: Type your AI prompt in the textarea
2. **Get Response**: Click the "Get Response" button to receive a mock AI response
3. **View Saved Entries**: Scroll down to see all your previously saved prompts and responses
4. **Delete Entries**: Click the red "Delete" button to remove unwanted entries

## Project Structure

```
ai-prompt-saver/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── style.css           # Custom CSS styles (if needed)
└── README.md           # Project documentation
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling with Tailwind CSS framework
- **JavaScript (ES6+)**: Modern JavaScript with async/await
- **Local Storage API**: Browser-based data persistence

## Features in Detail

### Mock AI Response
The application currently uses a mock AI response function that simulates a 1-second delay and returns a formatted response. This can be easily replaced with a real AI API integration.

### Local Storage
All prompts and responses are automatically saved to the browser's local storage, ensuring data persistence across browser sessions.

### Responsive Design
The interface is fully responsive and works seamlessly on both desktop and mobile devices.

## Customization

### Adding Real AI Integration
To integrate with a real AI service, replace the `getAIResponse` function in `script.js`:

```javascript
const getAIResponse = async (prompt) => {
    const response = await fetch('your-ai-api-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-api-key'
        },
        body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return data.response;
};
```

### Styling Customization
The application uses Tailwind CSS for styling. You can customize the appearance by:
- Modifying Tailwind classes in the HTML
- Adding custom CSS in `style.css`
- Configuring Tailwind theme in a `tailwind.config.js` file

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the beautiful UI framework
- [GitHub](https://github.com) for hosting and version control

## Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/yourusername/ai-prompt-saver/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer

---

**Made with ❤️ for the AI community** 