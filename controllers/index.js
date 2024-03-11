const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const userRoutes = require('./user-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/', userRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;