# The Boring Team (DAZN)

Submission to [The Hacker Games](https://thehackergames.co.uk) 2018

# Project Name

## Idea
More than 60% of the veterans are married. Their partner is the first point of contact for them to go back to civilian life.

This is why we targeted the **partners** of veterans.

### Phase 1 - The Bot
The partners can use our application, where a BOT chat with a static decision tree provides generic help with suggestions and link.

Through a friendly chat comunication we're profiling the user for the next phase.

### Phase 2 - The Chat with Real Person

Someone before them experienced the same issue, and they are willing to volounteer, so they open the same chat filling up a form with what their experience was.

Once the first person's profiling is "ready" we're letting them know that there's someone which match their profile and we connect them.

At this point they are chatting with a person with similar experience in the past.

## Tech

## Client
React Native application with Custom Bot implementation and Custom Chat implementation (we used Pusher ChatKit)

Run Instructions (you need the Expo app or Simulator)
```
cd client
yarn
yarn start
```

## Backend
NodeJS using Socket.io and MongoDB to handle the profiling and the decision tree for the Bot Messaging.

Run Instruction (you need `node` installed)
```
cd backend
npm install
npm start
```

### Deployment
We are using [now.sh](https://now.sh) to deploy our backend.

Deploy Instruction
```
cd backend
now
```

