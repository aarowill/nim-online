import './pre-start'; // Must be the first import
import logger from '@shared/logger';
import app from './server';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  logger.info(`Express server started on port: ${port}`);
});
