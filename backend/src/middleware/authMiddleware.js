import admin from '../config/firebaseAdmin.js';
import ApiError from '../utils/apiError.js';
import { findOrCreateUser } from '../services/user.service.js';

async function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith('Bearer ') ? authorization.split(' ')[1] : null;

  if (!token) {
    return next(new ApiError(401, 'Authentication token is missing'));
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken.uid) {
      return next(new ApiError(401, 'Invalid authentication token'));
    }

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
    };

    await findOrCreateUser(req.user);
    next();
  } catch (error) {
    // Attach underlying error message during development to aid debugging
    const message = process.env.NODE_ENV === 'production' ? 'Invalid or expired authentication token' : `Invalid or expired authentication token: ${error.message}`;
    console.error('Firebase token verification failed:', error);
    return next(new ApiError(401, message));
  }
}

export default authMiddleware;
