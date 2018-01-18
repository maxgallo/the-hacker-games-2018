import ChatClient from '../services/ChatClient';
import * as Events from '../constants/Events';

// Create new chat client with socket URL

const chatClient = new ChatClient('https://aa329ee8.ngrok.io');

// Listen for questions from the server

chatClient.addEventListener(Events.QUESTION, ({detail}) => {
    console.log('received question:', detail.question);
});

// Start the chat (e.g. when user opens app)

chatClient.startChat();