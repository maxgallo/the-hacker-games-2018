import io from 'socket.io-client';
import * as Events from '../constants/Events';

class ChatClient {
    constructor(url) {
        this.socket = io(url);

        this.questionCallback = null;
        this.messageCallback = null;
        this.connectCallback = null;
        this.typingCallback = null;
        this.disconnectCallback = null;

        this.init();

        console.log(`[ChatClient] ChatClient created and listening on "${url}"`);
    }

    init() {
        this.socket.on(Events.CONNECT, this.handleConnect.bind(this));
        this.socket.on(Events.QUESTION, this.handleQuestion.bind(this));
        this.socket.on(Events.MESSAGE, this.handleMessage.bind(this));
        this.socket.on(Events.TYPING, this.handleTyping.bind(this));
        this.socket.on(Events.DISCONNECT, this.handleDisconnect.bind(this));
    }

    sendEvent(eventType, eventData = '') {
        if (typeof eventData !== 'string') {
            eventData = JSON.stringify(eventData);
        }

        return new Promise((resolve, reject) => this.socket.emit(eventType, eventData, err => {
            if (err) reject(err);

            resolve();
        }));
    }

    handleQuestion(questionJson) {
        const question = JSON.parse(questionJson);

        // console.log('[ChatClient] Question received', question);

        if (typeof this.questionCallback === 'function') {
            this.questionCallback(question);
        }
    }

    handleMessage(message) {
        console.log('[ChatClient] Message received');

        if (typeof this.messageCallback === 'function') {
            this.messageCallback(message);
        }
    }

    handleTyping() {
        console.log('[ChatClient] Bot is typing...');

        if (typeof this.typingCallback === 'function') {
            this.typingCallback();
        }
    }

    handleConnect() {
        console.log('[ChatClient] Connected to server')

        if (typeof this.connectCallback === 'function') {
            this.connectCallback();
        }
    }

    handleDisconnect() {
        console.log('[ChatClient] Server disconnected');

        if (typeof this.disconnectCallback === 'function') {
            this.disconnectCallback();
        }
    }

    onQuestion(callback) {
        this.questionCallback = callback;
    }

    onMessage(callback) {
        this.messageCallback = callback;
    }

    onConnect(callback) {
        this.connectCallback = callback;
    }

    onTyping(callback) {
        this.typingCallback = callback;
    }

    onDisconnect(callback) {
        this.disconnectCallback = callback;
    }

    async startChat(whoami) {
        console.log('[ChatClient] Starting chat...');

        await this.sendEvent(Events.START_CHAT, whoami);
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
