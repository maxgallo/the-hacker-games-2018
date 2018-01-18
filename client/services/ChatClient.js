import io from 'socket.io-client';
import * as Events from '../constants/Events';

class Emitter {
    constructor() {
        const delegate = document.createDocumentFragment();

        this.addEventListener = delegate.addEventListener.bind(delegate);
        this.dispatchEvent = delegate.dispatchEvent.bind(delegate);
        this.removeEventListener = delegate.dispatchEvent.bind(delegate);
    }
  }

class ChatClient extends Emitter {
    constructor(url) {
        super();

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
        const event = new CustomEvent(Events.QUESTION, {
            detail: question
        })

        this.dispatchEvent(event);
    }

    handleConnect() {
        console.log('[ChatClient] Connected to server')
    }

    handleDisconnect() {
        console.log('[ChatClient] Server disconnected');
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
        await this.sendEvent(Events.ANSWER, answerId);
    }
}

export default ChatClient;