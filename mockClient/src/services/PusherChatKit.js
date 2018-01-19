import { ChatManager, TokenProvider } from "pusher-chatkit-client";

const tokenProvider = new TokenProvider({
    url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/9f05b08d-52eb-45d0-a762-d8c36f3a063c/token?instance_locator=v1:us1:9f05b08d-52eb-45d0-a762-d8c36f3a063c"
});

const chatManager = new ChatManager({
    userId: "astelvida",
    instanceLocator: "v1:us1:9f05b08d-52eb-45d0-a762-d8c36f3a063c",
    tokenProvider,
});

chatManager.connect({
    onSuccess: (currentUser) => {
        console.log("Successful connection");
    },
    onError: (error) => {
        console.log("Error on connection");
    }
});
