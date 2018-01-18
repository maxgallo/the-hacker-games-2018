/**
 * Socket Handler for the 'connection' event
 */
const connection = brain => async (socket) => {

  const question = await brain.getQuestion({ level: 0 });
  console.log('sending question', question);

  socket.emit('QUESTION', JSON.stringify(question));
  socket.on('ANSWER', payload => {
    console.log(payload);
  });


}

module.exports = (brain) => ({
  connection: connection(brain)
});
