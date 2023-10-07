/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import AppError from '@common/errors/AppError';
import TypeormErrorHandler from '@common/errors/TypeormError';

const GlobalExceptionMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _: NextFunction,
): Response<AppError> => {
  const handledError = TypeormErrorHandler(err);

  if (handledError instanceof AppError) {
    return res.status(handledError.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err ? err.message : 'Internal Server Error',
  });
};

export default GlobalExceptionMiddleware;
