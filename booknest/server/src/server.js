import app from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { logError, logInfo } from './utils/logger.js';

async function startServer() {
  try {
    await connectDatabase();
    logInfo('MongoDB connected');

    app.listen(env.port, () => {
      logInfo(`BookNest server running on port ${env.port}`);
    });
  } catch (error) {
    logError(`Server startup failed: ${error.message}`);
    process.exit(1);
  }
}

startServer();
