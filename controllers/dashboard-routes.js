const router = require('express').Router();
const { Post, User } = require('../models');
// Import the custom middleware for user authentication
const withAuth = require('../utils/auth');

// Create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const dbUser = await User.findOne({
        where: {
            username: req.session.user,
        },
        });

        const userID = dbUser.dataValues.id;

        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            published_date: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()+1}-${new Date().getDate()}`,
            user_id: userID,
        });

        res
            .status(200)
            .json({ 
                message: 'Created new post.',
                title: newPost.title,
                body: newPost.body,
            });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;