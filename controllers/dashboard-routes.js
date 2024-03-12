const router = require('express').Router();
const { Post, User } = require('../models');
// Middleware for user authentication
const withAuth = require('../utils/auth');

// Only logged in users may view the dashboard...

// GET dashboard - shows current users' posts
router.get('/', withAuth, async (req, res) => {
    try {
        const dbUser = await User.findOne({
        where: {
            username: req.session.user,
        },
        });

        const userID = dbUser.dataValues.id;

        const dbUserPosts = await Post.findAll({
        where: {
            user_id: userID,
        },
        });

        const userPosts = dbUserPosts.map((post =>
        post.get({ plain: true })
        ));

        res.render('dashboard', {
        userPosts,
        loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;