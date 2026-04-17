import multer from 'multer';

import { AppError } from '../common/app-error.js';
import { logger } from '../config/logger.js';

const toAppError = (error) => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    return new AppError({
      code: 'CV_FILE_TOO_LARGE',
      message: 'CV file exceeds the allowed size limit.',
      statusCode: 413
    });
  }

  return new AppError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred.',
    statusCode: 500
  });
};

export const errorMiddleware = (error, req, res, _next) => {
  const appError = toAppError(error);

  if (appError.statusCode >= 500) {
    logger.error('Unhandled application error', {
      method: req.method,
      path: req.originalUrl,
      code: appError.code,
      message: error.message
    });
  }

  res.status(appError.statusCode).json({
    error: {
      code: appError.code,
      message: appError.message,
      details: appError.details
    }
  });
};