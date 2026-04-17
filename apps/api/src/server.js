import { app } from './app.js';
import { db } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { startAnalysesWorker, WORKER_INTERVAL_MS } from './workers/analyses.worker.js';

let server;
let stopWorker;

const startHttpServer = () =>
  new Promise((resolve) => {
    server = app.listen(env.PORT, () => {
      resolve();
    });
  });

const shutdown = (signal) => {
  logger.info(`Received ${signal}. Shutting down API...`);

  if (stopWorker) {
    stopWorker();
    logger.info('Analyses worker stopped');
  }

  if (!server) {
    process.exit(0);
    return;
  }

  server.close(() => {
    logger.info('API server stopped');
    process.exit(0);
  });
};

const bootstrap = async () => {
  try {
    await db.query('SELECT 1');
    await startHttpServer();

    stopWorker = startAnalysesWorker();

    const baseUrl = `http://localhost:${env.PORT}`;

    logger.raw('');
    logger.startup.banner({
      title: 'HireRank API',
      subtitle: 'AI-Assisted Resume & Job Matching Platform'
    });

    logger.startup.section('Runtime');
    logger.startup.field('Project', 'HireRank API');
    logger.startup.field('Environment', env.NODE_ENV);
    logger.startup.field('Port', env.PORT);
    logger.startup.field('Base URL', baseUrl);

    logger.startup.section('Services');
    logger.startup.service('PostgreSQL', 'connected');
    logger.startup.service('AI Service', env.AI_SERVICE_BASE_URL);

    logger.startup.section('Workers');
    logger.startup.service('Analyses Worker', `running (${WORKER_INTERVAL_MS}ms)`);

    logger.startup.ready('API ready to accept requests');
  } catch (error) {
    logger.raw('');
    logger.startup.banner({
      title: 'HireRank API',
      subtitle: 'Startup failure'
    });
    logger.error('Startup failed', { message: error.message });
    process.exit(1);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

void bootstrap();