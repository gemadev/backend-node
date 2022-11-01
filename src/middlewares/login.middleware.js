export default function login(req, res, next) {
  let admin = true;
  if (admin) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}