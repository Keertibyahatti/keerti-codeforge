import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction): void => {
  console.error('[API Error]:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: err.name || 'Error',
    message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
};
