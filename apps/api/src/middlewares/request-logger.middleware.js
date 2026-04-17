import { logger } from '../config/logger.js';

export const requestLoggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - start;
    logger.info('HTTP request', {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs
    });
  });

  next();
};