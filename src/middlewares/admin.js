export const admin = (req, res, next) => {
  if (req.user) {
    req.admin = req.user.isAdmin;
  } else {
    req.admin = false;
  }
  next();
};
