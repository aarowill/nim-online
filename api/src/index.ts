import './pre-start'; // Must be the first import
import logger from '@shared/logger';
import server from './server';

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || 'localhost';

// Start the server
server.listen(port, host, () => {
  logger.info(`Web server started on port: ${port}`);
});
