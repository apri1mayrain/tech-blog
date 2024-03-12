const router = require('express').Router();
const { User } = require('../models');

// GET login page
router.get('/login', (req, res) => {
    // If user is logged in, they will be redirected to dashboard
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

// POST to login user
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
            .json({ message: 'Account does not exist. Please try again or signup!', });
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
        req.session.loggedIn = true;
        // Saves the currently logged in user by their username
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

// POST to logout user
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