const SocketIO = require('socket.io');
const server = require('http').createServer();

/**
 * Fire up a new socket IO server
 * @param {object} opts
 */
const createServer = (opts = {}, logger) => {
  const io = SocketIO(opts.port || 3000, {
    path: opts.path || '/',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });
  return attachBasicEvents(io, logger);
};

const attachBasicEvents = (io, logger) => {
  io.on('connection', socket => {
    logger.info('new client connected');

    // socket.emit('START_CHAT', 'HellO World');
    // socket.on('START_CHAT', message => {
    //   console.log('START_CHAT!');
    // });
    const sampleQuestion = {
      question: 'How are you feeling today?',
      answers: [
        { id: '123', text: 'Good' },
        { id: '456', text: 'Bad' }
      ]
    };
    socket.emit('QUESTION', JSON.stringify(sampleQuestion));
    socket.on('ANSWER', payload => {
      console.log(payload);
    })
  });
  io.on('disconnect', socket => {
    console.log('Disconnected');
  });
  return io;
};

// const handle

module.exports = {
  createServer
}