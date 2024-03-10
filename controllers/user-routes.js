const router = require('express').Router();
const { User } = require('../models');

// Signup or create new user
router.post('/signup', async (req, res) => {
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
        .json({ message: 'Incorrect username. Please try again!' });
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
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;