import asyncHandler from '../utils/asyncHandler.js';
import { findOrCreateUser } from '../services/user.service.js';

export const getProfile = asyncHandler(async (req, res) => {
  const user = await findOrCreateUser(req.user);

  res.json({
    status: 'success',
    data: {
      uid: user.uid,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
});
