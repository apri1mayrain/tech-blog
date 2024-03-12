const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// Middleware for user authentication
const withAuth = require('../utils/auth');

// GET a post by its ID
router.get('/:id', async (req, res) => {
    try {
        // Obtain post data
        const dbPost = await Post.findByPk(req.params.id, {
            include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
        });

        // Obtain comments data
        const dbComments = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
        });

        const post = dbPost.get({ plain: true });
        const comments = dbComments.map((comment =>
            comment.get({ plain: true })
            ));
        
        res.render('single-post', {
            post,
            comments,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Only logged in users can create/update/delete posts or post comments...

// POST to create new post
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

// POST new comment
router.post('/comment', withAuth, async (req, res) => {
    try {
        const dbUser = await User.findOne({
        where: {
            username: req.session.user,
        },
        });

        const newComment = await Comment.create({
            body: req.body.body,
            published_date: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()+1}-${new Date().getDate()}`,
            user_id: dbUser.dataValues.id,
            post_id: req.body.postID,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// UPDATE post
router.put('/edit/:id', withAuth, async (req, res) => {
})

// DELETE post
router.delete('/edit/:id', withAuth, async (req, res) => {
})

module.exports = router;