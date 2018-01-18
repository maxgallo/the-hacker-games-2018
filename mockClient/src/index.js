import ChatClient from './services/ChatClient';
import * as Events from './constants/Events';

const answersArea = document.querySelector('#answers');
const questionArea = document.querySelector('#question');

answersArea.addEventListener('click', handleAnswerClick);

// Create new chat client with socket URL

const chatClient = new ChatClient('https://fbef2b12.ngrok.io');

function renderAnswerButtons(answers = []) {
    answersArea.innerHTML = answers.reduce((html, answer) => html + `<button data-id="${answer.id}">${answer.text}</button>`, '');
}

function handleAnswerClick({target}) {
    const answerId = target.getAttribute('data-id');

    chatClient.selectAnswer(answerId);

    renderAnswerButtons();
}

// Listen for questions from the server

chatClient.onQuestion(question => {
    questionArea.value = question.question;

    renderAnswerButtons(question.answers);
});

chatClient.onMessage(message => {
    questionArea.value = message;

    renderAnswerButtons();
});

// Start the chat (e.g. when user opens app)

chatClient.startChat();