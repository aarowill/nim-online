import http from 'http';
import socketio from 'socket.io';
import eventHandlers from '@src/event-handlers';

// Create HTTP server
const server = http.createServer();

// Socket.io
const io = socketio(server);
io.sockets.on('connect', (socket) => {
  Object.entries(eventHandlers).forEach(([event, handler]) => {
    socket.on(event, (...args) => {
      handler(socket, ...args);
    });
  });
});

// Export the server
export default server;
