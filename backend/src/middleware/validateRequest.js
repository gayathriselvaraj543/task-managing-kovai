import { validationResult } from 'express-validator';
import ApiError from '../utils/apiError.js';

export default function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const formatted = errors.array().map(({ msg, param, location }) => ({
    field: param,
    message: msg,
    location,
  }));

  next(new ApiError(400, 'Validation failed', formatted));
}
