const router = require('express').Router();
const { Post, User } = require('../models');

// GET homepage - displays all posts in database
router.get('/', async (req, res) => {
  try {
    const dbPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = dbPosts.map((post =>
      post.get({ plain: true })
    ));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;