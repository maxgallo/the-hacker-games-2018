/**
 * Socket Handler for the 'connection' event
 */
const connection = brain => async (socket) => {
  // const sampleQuestion = {
  //   question: 'How are you feeling today?',
  //   answers: [
  //     { id: '123', text: 'Good' },
  //     { id: '456', text: 'Bad' }
  //   ]
  // };
  const question = await brain.getQuestion({ level: 0 });
  socket.emit('QUESTION', JSON.stringify(question));
  socket.on('ANSWER', payload => {
    console.log(payload);
  });
}

module.exports = (brain) => ({
  connection: connection(brain)
});
