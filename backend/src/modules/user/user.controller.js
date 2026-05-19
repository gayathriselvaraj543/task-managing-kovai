import User from './user.model.js';

export async function getProfile(req, res, next) {
  try {
    const { uid, email } = req.user;

    const user = await User.findOneAndUpdate(
      { uid },
      { email },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    res.json({
      uid: user.uid,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
}
