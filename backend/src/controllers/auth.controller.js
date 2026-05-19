import asyncHandler from '../utils/asyncHandler.js';

export const verifyAuth = asyncHandler(async (req, res) => {
  res.json({ status: 'success', data: req.user });
});
