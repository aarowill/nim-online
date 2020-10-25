import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import socketio from 'socket.io';
import eventHandlers from '@src/event-handlers';

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const corsOptions: cors.CorsOptions = {
  origin: process.env.ALLOW_ORIGIN || '*',
  methods: ['GET', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(helmet());

app.get('/api/health', (_req, res) => res.send('OK'));

// Socket.io
const server = createServer(app);

const io = socketio(server, { path: '/api/socket' });

io.sockets.on('connect', (socket) => {
  Object.entries(eventHandlers).forEach(([event, handler]) => {
    socket.on(event, handler(socket));
  });
});

export default server;
