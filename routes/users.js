var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');

var csrfProtection = new csrf();

router.use(csrfProtection);

/* GET csrfToken */
router.get('/signup', function(req, res, next) {
  res.json({csrfToken: req.csrfToken()});
});

router.post('/signup', function(req, res, next) {
  passport.authenticate('local.signup', function(err, user, messages) {
    if (err) { return next(err); }
    if (!user) {
      messages.isLoggedIn = false;
      return res.json(messages);
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      if (user) {
        user = user.toObject();
        user.isLoggedIn = isLoggedIn(req, res, next);
        delete user.password;
        return res.json(user);
      } else {
        messages.isLoggedIn = false;
        return res.json(messages);
      }
    });
  })(req, res, next);
});

router.post('/signin', function(req, res, next) {
  passport.authenticate('local.signin', function(err, user, messages) {
    if (err) { return next(err); }
    if (!user) {
      messages.isLoggedIn = false;
      return res.json(messages);
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      if (user) {
        user = user.toObject();
        user.isLoggedIn = isLoggedIn(req, res, next);
        delete user.password;
        return res.json(user);
      } else {
        messages.isLoggedIn = false;
        return res.json(messages);
      }
    });
  })(req, res, next);
});


router.get('/profile', function(req, res, next) {
  //res.json([{a: 'Profile'}]);
});

module.exports = router;

function isLoggedIn (req, res, next) {
  return req.isAuthenticated();
};