import User from '../models/user.model.js';

export async function findOrCreateUser({ uid, email }) {
  return User.findOneAndUpdate(
    { uid },
    { email },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  ).lean();
}

export async function getUserByUid(uid) {
  return User.findOne({ uid }).lean();
}
