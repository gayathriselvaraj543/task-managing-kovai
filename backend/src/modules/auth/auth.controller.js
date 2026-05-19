export function verifyAuth(req, res) {
  res.json({ uid: req.user.uid, email: req.user.email });
}
