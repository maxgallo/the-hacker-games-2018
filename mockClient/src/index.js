import ChatClient from './services/ChatClient';
import * as Events from './constants/Events';

const answersArea = document.querySelector('#answers');
const questionArea = document.querySelector('#question');

// Create new chat client with socket URL

const chatClient = new ChatClient('https://aa329ee8.ngrok.io');

// Listen for questions from the server

chatClient.onQuestion(question => {
    console.log('question received', question);
});

// Start the chat (e.g. when user opens app)

chatClient.startChat();