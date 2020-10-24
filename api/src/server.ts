import http from 'http';
import socketio from 'socket.io';
import eventHandlers from '@src/event-handlers';

import logger from '@shared/logger';

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set CORS options
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' ? 'prodserver' : '*');
  res.setHeader('Access-Control-Max-Age', 600);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
  }
});

// Socket.io
const io = socketio(server, { path: '/api' });
io.sockets.on('connect', (socket) => {
  logger.info('Got connection!');
  Object.entries(eventHandlers).forEach(([event, handler]) => {
    socket.on(event, (data /* , callback */) => {
      handler(socket, data /* , callback */);
    });
  });
});

// Export the server
export default server;
