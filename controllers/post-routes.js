const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
// Middleware for user authentication
const withAuth = require('../utils/auth');

// GET to view post
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

// GET to edit users post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        // Obtain post data
        const dbPost = await Post.findByPk(req.params.id);

        const post = dbPost.get({ plain: true });
        
        res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

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
                message: 'Successfully created new post.',
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

        res
            .status(200)
            .json({ 
                message: 'Successfully created new comment.',
                body: newComment.body,
            });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// PUT to update post (title, body, or title+body)
router.put('/update', withAuth, async (req, res) => {
    try {
        let updatePost;
        // Update body ONLY
        if(!req.body.title){
            updatePost = await Post.update({
                body: req.body.body,
            },
            {
                where: { 
                    id: req.body.postID,
                }
            });
        }

        // Update title ONLY
        else if (!req.body.body){
            updatePost = await Post.update({
                title: req.body.title,
            },
            {
                where: { 
                    id: req.body.postID,
                }
            });
        }

        // Update title and body
        else if (req.body.title && req.body.body) {
            updatePost = await Post.update({
                title: req.body.title,
                body: req.body.body,
            },
            {
                where: { 
                    id: req.body.postID,
                }
            });
        }

        // Notify user post was successfully updated
        res
            .status(200)
            .json({ 
                message: 'Successfully updated post.',
                title: updatePost.title,
                body: updatePost.body,
             });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE post
router.delete('/delete', withAuth, async (req, res) => {
    try {
        const dbPost = await Post.destroy({
            where: { id: req.body.postID }
        });

        if(!dbPost) {
            res
                .status(400)
                .json({ message: 'Could not find post to delete.' });
            return;
        }

        // Ensure the next new post ID will be set to the current max ID + 1
        const maxPostId = await Post.max('id');
        const nextPostId = await sequelize.query(`ALTER TABLE post AUTO_INCREMENT = ${maxPostId+1};`);

        // Notify user post was successfully deleted
        res
            .status(200)
            .json({ message: `Successfully deleted post.` });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;