import ChatClient from './services/ChatClient';
import * as Events from './constants/Events';

// Mock ChatClient integration:

const answersArea = document.querySelector('#answers');
const questionArea = document.querySelector('#question');

answersArea.addEventListener('click', handleAnswerClick);

// Create new chat client with socket URL

const chatClient = new ChatClient('https://aa329ee8.ngrok.io');

function renderAnswerButtons(answers = []) {
    let buttonsHtml = '';

    answers.forEach(answer => {
        buttonsHtml += `<button data-id="${answer.id}">${answer.text}</button>`;
    });

    answersArea.innerHTML = buttonsHtml;
}

// Listen for questions from the servers

chatClient.addEventListener(Events.QUESTION, ({detail}) => {
    questionArea.value = detail.question;

    renderAnswerButtons(detail.answers);
});

function handleAnswerClick({target}) {
    const answerId = target.getAttribute('data-id');

    chatClient.selectAnswer(answerId);

    renderAnswerButtons();
}

// Start the chat (e.g. when user opens app)

chatClient.startChat();