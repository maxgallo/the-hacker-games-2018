import ChatClient from './services/ChatClient';
import * as Events from './constants/Events';

const answersArea = document.querySelector('#answers');
const questionArea = document.querySelector('#question');
const buttonRestart = document.querySelector('#restart');

answersArea.addEventListener('click', handleAnswerClick);
buttonRestart.addEventListener('click', handleRestartClick);

// Create new chat client with socket URL

const chatClient = new ChatClient('https://e0999860.ngrok.io');

function renderAnswerButtons(answers = []) {
    answersArea.innerHTML = answers.reduce((html, answer) => html + `<button data-id="${answer._id}">${answer.message}</button>`, '');
}

function renderChosenAnswer(text) {
    questionArea.innerHTML += `<button disabled>${text}</button>`;
}

function handleAnswerClick({target}) {
    const answerId = target.getAttribute('data-id');

    chatClient.selectAnswer(answerId);

    renderChosenAnswer(target.textContent);
    renderAnswerButtons();
}

function handleRestartClick() {
    questionArea.innerHTML = answersArea.innerHTML = '';

    chatClient.endChat();
    chatClient.startChat();
}

// Listen for questions from the server

chatClient.onQuestion(question => {
    const link = question.link;
    const typing = questionArea.querySelector('.typing');

    let linkHtml = '';

    if (typing) {
        typing.parentElement.removeChild(typing);
    }

    if (link) {
        linkHtml += `. <a href="${link}" target="_blank">Learn more</a>.`;
    }

    questionArea.innerHTML += `<li>${question.message + linkHtml}</li>`;

    renderAnswerButtons(question.answers);
});

chatClient.onMessage(message => {

});

chatClient.onTyping(message => {
    questionArea.innerHTML += `<li class="typing">...</li>`;
});

chatClient.onDisconnect(handleRestartClick);

chatClient.onConnect(() => {
    chatClient.startChat();
});
