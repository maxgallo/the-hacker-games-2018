/**
 * Socket Handler for the 'connection' event
 */
const connection = brain => async (socket) => {

  const messages = await brain.getQuestion({ level: -1 });

  const sendMessage = (socket, event, payload, messageIndex) => {
    setTimeout(() => {
      socket.emit(event, JSON.stringify(payload));
    }, 1000 * messageIndex)
  };

  let index = 0;
  for (message in messages) {
    sendMessage(socket, 'QUESTION', message, index++);
  }

  socket.on('ANSWER', payload => {
    console.log(payload);
  });
}

module.exports = (brain) => ({
  connection: connection(brain)
});
