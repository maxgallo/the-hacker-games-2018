const chatEvents = {
  START_CHAT: 'START_CHAT',
  END_CHAT: 'END_CHAT',
  QUESTIONS: 'QUESTIONS',
  ANSWERS: 'ANSWERS'
};

module.exports = {
  chatEvents,
  port: process.env.PORT || 3000,
  db: {
    mongoUrl: 'mongodb://whatever:hackergames@ds261527.mlab.com:61527/thehackergames'
  }
};
