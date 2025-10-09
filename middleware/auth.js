// Authentication middleware
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/');
};

// Check if user is already logged in
exports.isGuest = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.redirect('/exam/dashboard');
  }
  next();
};
