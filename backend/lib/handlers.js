/**
 * Socket Handler for the 'connection' event
 */
const connection = brain => socket => {
  socket.on('START_EVENT', async payload => {
    const questions = await brain.getQuestion({ query: { level: -1 } });

    const sendMessage = (socket, event, payload, messageIndex) => {
      setTimeout(() => {
        console.log('messageIndex ===>', messageIndex);
        socket.emit(event, JSON.stringify(payload));
        console.log('emitting...', payload.message)
      }, 1000 * messageIndex)
    };

    let index = 0;
    for (let question of questions) {
      sendMessage(socket, 'QUESTION', question, index++);
    }
  });

  socket.on('ANSWER', payload => {
    console.log(payload);
  });
};

module.exports = brain => ({
  connection: connection(brain)
});
