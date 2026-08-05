const express = require('express');
const passport = require('passport');

const router = express.Router();

// Start GitHub login
router.get(
  '/login',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub callback
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: true
  }),
  (req, res) => {
    res.redirect('/profile');
  }
);

// Profile
router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Not logged in'
    });
  }

  res.json({
    authenticated: true,
    user: {
      id: req.user.id,
      username: req.user.username,
      displayName: req.user.displayName
    }
  });
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.json({
      message: 'Logged out successfully'
    });
  });
});

module.exports = router;