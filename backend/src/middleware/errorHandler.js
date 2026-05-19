import ApiError from '../utils/apiError.js';

export default function globalErrorHandler(err, req, res, next) {
  let statusCode = err.statusCode || err.status || 500;
  const response = {
    status: 'error',
    message: err.message || 'Internal server error',
  };

  if (err.name === 'ValidationError') {
    statusCode = 400;
    response.message = 'Database validation failed';
    response.errors = Object.values(err.errors).map((field) => ({
      field: field.path,
      message: field.message,
    }));
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    response.message = `Invalid ${err.path} value`;
  }

  if (err instanceof ApiError && err.errors) {
    response.errors = err.errors;
  }

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  // Log only server errors (5xx) to avoid noisy logs for expected client errors (4xx)
  if (statusCode >= 500) {
    console.error(err);
  } else if (process.env.NODE_ENV !== 'production') {
    // In development, log warnings for 4xx to help debugging but without full stack
    console.warn('Client error:', err.message || err);
  }

  res.status(statusCode).json(response);
}
