const router = require('express').Router();
const { User } = require('../models');

// GET signup page
router.get('/', (req, res) => {
    // If user is logged in, they will be redirected to dashboard
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('sign-up');
});

// POST to signup or create new user
router.post('/', async (req, res) => {
    try {
        const dbUser = await User.findOne({
        where: {
            username: req.body.username,
        },
        });

        // Validation for existing username
        if (dbUser) {
        res
            .status(400)
            .json({ message: 'Username already exists. Please try again!' });
        return;
        }

        // Validation for password length
        if (req.body.password.length < 8) {
        res
            .status(400)
            .json({
            message: 'Password must be at least 8 characters. Please try again!',
            });
        return;
        }

        // Create new user
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

module.exports = router;