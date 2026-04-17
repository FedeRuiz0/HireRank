import express from 'express';

import { requestLoggerMiddleware } from './middlewares/request-logger.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { healthRouter } from './modules/health/health.routes.js';
import { cvRouter } from './modules/cv/cv.routes.js';

const app = express();

app.use(express.json());
app.use(requestLoggerMiddleware);

app.use(healthRouter);
app.use(cvRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };