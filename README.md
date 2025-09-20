# [Wally](https://wally.walnutlabs.in): The Voice-Controlled SVG Chatbot

A simple, interactive chatbot that uses browser-based voice recognition and speech synthesis to communicate. Wally's SVG face changes expression based on the state of the conversation, creating a more engaging user experience. The project uses a serverless Netlify Function to securely connect to the OpenAI API.



---

## Features

-   **Voice Control**: Uses the Web Speech API for voice recognition.
-   **Text-to-Speech**: Responds with synthesized speech.
-   **Dynamic SVG Face**: The bot's facial expression changes to reflect its state (e.g., listening, thinking, talking).
-   **Serverless Backend**: Uses a Netlify Function to handle API requests securely.
-   **No-Framework Frontend**: Built with plain HTML, CSS, and JavaScript.

---

## How to Use

1.  **Open the web page.**
2.  **Click anywhere** on the screen or press the **spacebar** to start listening.
3.  **Ask a question** or say a command.
4.  Wally will "think" for a moment and then speak a response.

---

## Setup and Deployment

To deploy your own version of Wally, you'll need a Netlify account, a GitHub account, and an OpenAI API key.

### ### 1. Prepare the Project

Create the following file structure in your local project folder: (same as this repo)

### ### 2. Push to GitHub

Initialize a Git repository in your project folder and push it to a new repository on your GitHub account.

### ### 3. Deploy on Netlify

1.  Log in to Netlify and select **Add new site** > **Import an existing project**.
2.  Connect to GitHub and select your new repository. Netlify will automatically detect the correct build settings.
3.  Before deploying, configure your environment variable:
    -   Go to **Site settings** > **Build & deploy** > **Environment**.
    -   Add a new variable:
        -   **Key:** `OPENAI_API_KEY`
        -   **Value:** Your secret API key from OpenAI (starts with `sk-...`).
4.  Click **Deploy site**. Netlify will build and deploy your project, and your Wally chatbot will be live.

---

## Technologies Used

-   **Frontend**: HTML, CSS, JavaScript
-   **APIs**: Web Speech API (SpeechRecognition & SpeechSynthesis), OpenAI API
-   **Backend**: Netlify Functions (Node.js)
-   **Hosting**: Netlify
