const SocketIO = require('socket.io');
const server = require('http').createServer();

/**
 * Fire up a new socket IO server
 */
const createServer = (opts = {}, logger, handlers) => {
  const io = SocketIO(opts.port || 3000, {
    path: opts.path || '/',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });
  return attachBasicEvents(io, logger, handlers);
};

/**
 * Attaches main socket connect/disconnect event listeners
 */
const attachBasicEvents = (io, logger, handlers) => {
  io.on('connection', handlers.connection);
  io.on('disconnect', socket => {
    logger.info('client disconnected');
  });
  return io;
};

module.exports = {
  createServer
}