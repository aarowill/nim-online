import http from 'http';
import socketio from 'socket.io';
import eventHandlers from '@src/event-handlers';

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set CORS options
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || '*');
  res.setHeader('Access-Control-Max-Age', 600);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
  }

  // Simple health check endpoint
  if (req.method === 'GET' && req.url === '/api/health') {
    res.writeHead(200);
    res.write('OK');
    res.end();
  }
});

// Socket.io
const io = socketio(server, { path: '/api' });
io.sockets.on('connect', (socket) => {
  Object.entries(eventHandlers).forEach(([event, handler]) => {
    socket.on(event, handler(socket));
  });
});

// Export the server
export default server;
