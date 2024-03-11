const router = require('express').Router();
const { Post, User } = require('../models');
// Import the custom middleware for user authentication
const withAuth = require('../utils/auth');

// GET posts for homepage
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

// GET users posts for dashboard page
// Only logged in users may view the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
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

// GET login page
router.get('/login', (req, res) => {
  // If user is logged in, they will be redirected to dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// GET signup page
router.get('/signup', (req, res) => {
  // If user is logged in, they will be redirected to dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('sign-up');
});

// GET specific post page
router.get('/post/:id', async (req, res) => {
})

module.exports = router;