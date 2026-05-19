import { body, param, query } from 'express-validator';
import { TASK_STATUSES } from '../models/task.model.js';

const allowedStatusMessage = `Status must be one of: ${TASK_STATUSES.join(', ')}`;

export const validateTaskCreation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 120 })
    .withMessage('Title must be 120 characters or less'),
  body('description')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage('Description must be 500 characters or less'),
  body('status')
    .optional()
    .trim()
    .isIn(TASK_STATUSES)
    .withMessage(allowedStatusMessage),
];

export const validateTaskFilter = [
  query('status')
    .optional()
    .trim()
    .isIn(TASK_STATUSES)
    .withMessage(allowedStatusMessage),
];

export const validateTaskUpdate = [
  param('id').isMongoId().withMessage('Task id must be a valid MongoDB id'),
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 120 })
    .withMessage('Title must be 120 characters or less'),
  body('description')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage('Description must be 500 characters or less'),
  body('status')
    .optional()
    .trim()
    .isIn(TASK_STATUSES)
    .withMessage(allowedStatusMessage),
  body().custom((value) => {
    if (!value.title && !value.description && !value.status) {
      throw new Error('At least one field (title, description, status) must be provided');
    }
    return true;
  }),
];
