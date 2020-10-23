import './pre-start'; // Must be the first import
import { Server } from 'http';
import logger from '@shared/logger';
import app from './server';

/**
 * Start a node server.
 */
const startServer = (server: Server): void => {
  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || 'localhost';

  // Start the server
  server.listen(port, host, () => {
    logger.info(`Socket.io server started on port: ${port}`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer(app);
}

export default startServer;
