import io from 'socket.io-client';
import * as Events from '../constants/Events';

class ChatClient {
    constructor(url) {
        this.questionCallback = null;
        this.socket = io(url);

        this.init();
    }

    init() {
        this.socket.on(Events.CONNECT, this.handleConnect.bind(this));
        this.socket.on(Events.QUESTION, this.handleQuestion.bind(this));
        this.socket.on(Events.DISCONNECT, this.handleDisconnect.bind(this));
    }

    sendEvent(eventType, eventData = '') {
        return new Promise(resolve => this.socket.emit(eventType, eventData, resolve));
    }

    handleQuestion(questionJson) {
        console.log('[ChatClient] Question received');

        const question = JSON.parse(questionJson);

        if (typeof this.questionCallback === 'function') {
            this.questionCallback(question);
        }
    }

    handleConnect() {
        console.log('[ChatClient] Connected to server')
    }

    handleDisconnect() {
        console.log('[ChatClient] Server disconnected');
    }

    onQuestion(callback) {
        this.questionCallback = callback;
    }

    async startChat() {
        console.log('[ChatClient] Starting chat...');

        await this.sendEvent(Events.START_CHAT);
    }

    async endChat() {
        console.log('[ChatClient] Ending chat...');

        await this.sendEvent(Events.END_CHAT);
    }

    async selectAnswer(answerId) {
        console.log(`[ChatClient] Selected answer ${answerId}`);

        await this.sendEvent(Events.ANSWER, answerId);
    }
}

export default ChatClient;