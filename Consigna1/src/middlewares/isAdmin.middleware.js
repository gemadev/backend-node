export default function login(req, res, next) {
  if (req.session?.user?.admin) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}