const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const loginRoutes = require('./login-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const signupRoutes = require('./signup-routes.js');
const postRoutes = require('./post-routes.js');

router.use('/', homeRoutes); // View homepage
router.use('/', loginRoutes); // Login/logout user
router.use('/signup', signupRoutes); // Signup user
router.use('/dashboard', dashboardRoutes); // View dashboard
router.use('/post', postRoutes); // CRUD posts or create comment

module.exports = router;