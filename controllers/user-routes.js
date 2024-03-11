const router = require('express').Router();
const { User } = require('../models');

// Signup or create new user
router.post('/signup', async (req, res) => {
  try {
    const dbUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (dbUser) {
      res
        .status(400)
        .json({ message: 'Username already exists. Please try again!' });
      return;
    }

    if (req.body.password.length < 8){
      res
        .status(400)
        .json({ message: 'Password must be at least 8 characters. Please try again!' });
      return;
    }

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    res
      .status(200)
      .json({ user: newUser.username, message: 'You are now signed up!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const dbUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUser) {
      res
        .status(400)
        .json({ message: 'Account does not exist. Please try again or signup!' });
      return;
    }

    // Compare submitted pw matches the stored, hashed pw
    const validPassword = await dbUser.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    // Save session parameters
    req.session.save(() => {
      // Sets loggedIn status to true
      req.session.loggedIn = true;
      // Saves the currently logged in user
      req.session.user = req.body.username;
      // Set users logged in session to expire in 5 minutes
      req.session.cookie.maxAge = 300000;

      res
        .status(200)
        .json({ user: dbUser.username, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.loggedIn = false;
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;