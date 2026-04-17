import { AppError } from '../common/app-error.js';

export const notFoundMiddleware = (req, _res, next) => {
  next(
    new AppError({
      code: 'NOT_FOUND',
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      statusCode: 404
    })
  );
};