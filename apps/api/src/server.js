import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { startAnalysesWorker } from './workers/analyses.worker.js';

const server = app.listen(env.PORT, () => {
  logger.info(`HireRank API running on port ${env.PORT}`);
});

const stopWorker = startAnalysesWorker();

const shutdown = (signal) => {
  logger.info(`Received ${signal}. Shutting down API...`);

  stopWorker();

  server.close(() => {
    logger.info('API server stopped');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));