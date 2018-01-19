import { ChatManager, TokenProvider } from "pusher-chatkit-client";

const tokenProvider = new TokenProvider({
    url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/9f05b08d-52eb-45d0-a762-d8c36f3a063c/token?instance_locator=v1:us1:9f05b08d-52eb-45d0-a762-d8c36f3a063c"
});

const messages = document.querySelector('#chat-messages');
const form = document.querySelector('#chat-form');
const input = document.querySelector('#chat-input');

let room, user;

form.addEventListener('submit', handleSubmit);

const chatManager = new ChatManager({
    userId: "patrick",
    instanceLocator: "v1:us1:9f05b08d-52eb-45d0-a762-d8c36f3a063c",
    tokenProvider,
});

chatManager.connect({
    onSuccess: currentUser => {
        console.log('connected to chatkit');

        user = currentUser;

        joinRoom(currentUser);
    },
    onError: (error) => {
        console.log("Error on connection");
    }
});

function joinRoom(currentUser) {
    const activeRoom = currentUser.rooms[0];

    if (activeRoom) {
        console.log('connected to', activeRoom);

        room = activeRoom;

        subscribeToMessages(activeRoom);
    } else {
        console.log('no active room for', currentUser);
    }
}

function subscribeToMessages(activeRoom) {
    user.subscribeToRoom(activeRoom, {newMessage: handleMessage}, 0);
}

function handleMessage(message) {
    console.log(message);

    const isMe = message.sender.id === user.id;

    messages.innerHTML += `<li${isMe ? ' style="margin-left: 20px"': ''}>${message.text}</li>`;
}

function handleSubmit(e) {
    e.preventDefault();

    const message = input.value || '';

    input.value = '';

    user.sendMessage(
        {
            text: message,
            roomId: room.id
        },
        (messageId) => console.log(`Added message`),
        (error) => console.log(`Error adding message`)
    );
}


