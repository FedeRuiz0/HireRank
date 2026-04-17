import express from 'express';
import cors from 'cors';

import { requestLoggerMiddleware } from './middlewares/request-logger.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { healthRouter } from './modules/health/health.routes.js';
import { cvRouter } from './modules/cv/cv.routes.js';
import { analysesRouter } from './modules/analyses/analyses.routes.js';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
  })
);

app.use(express.json());
app.use(requestLoggerMiddleware);

app.use(healthRouter);
app.use(cvRouter);
app.use(analysesRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };