// Check if user is authenticated
const withAuth = (req, res, next) => {
  // If the user is not authenticated, redirect the user to the login page
  if(!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the next requested page
    next();
  }
};

module.exports = withAuth;