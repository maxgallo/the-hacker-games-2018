const chatEvents = {
  START_CHAT: 'START_CHAT',
  END_CHAT: 'END_CHAT',
  QUESTION: 'QUESTION',
  ANSWER: 'ANSWER',
  TYPING: 'TYPING'
};

module.exports = {
  chatEvents,
  port: process.env.PORT || 3000,
  db: {
    mongoUrl: 'mongodb://whatever:hackergames@ds261527.mlab.com:61527/thehackergames'
  },
  models: {
    dirname: `${__dirname}/models`,
    recursive: true
  }
};
