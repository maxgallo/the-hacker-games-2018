import ChatClient from './services/ChatClient';
import * as Events from '../../shared/constants/Events';

const answersArea = document.querySelector('#answers');
const questionArea = document.querySelector('#question');

answersArea.addEventListener('click', handleAnswerClick);

// Create new chat client with socket URL

const chatClient = new ChatClient('https://a0e5f27d.ngrok.io');

function renderAnswerButtons(answers = []) {
    answersArea.innerHTML = answers.reduce((html, answer) => html + `<button data-id="${answer._id}">${answer.message}</button>`, '');
}

function handleAnswerClick({target}) {
    const answerId = target.getAttribute('data-id');

    chatClient.selectAnswer(answerId);

    renderAnswerButtons();
}

// Listen for questions from the server

chatClient.onQuestion(question => {
    questionArea.value = question.message;

    renderAnswerButtons(question.answers);
});

chatClient.onMessage(message => {
    questionArea.value = message;

    renderAnswerButtons();
});

// Start the chat (e.g. when user opens app)

chatClient.startChat();