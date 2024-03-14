
![Tech Tidbits Logo](./screenshots/logo.png)
# Tech Blog
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://github.com/apri1mayrain/tech-blog/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-darkgreen?style=for-the-badge)](https://nodejs.org/en)
[![Express.js](https://img.shields.io/badge/Express.js-darkgreen?style=for-the-badge)](https://expressjs.com/)

[![Dotenv](https://img.shields.io/badge/NPM-dotenv-yellow?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/dotenv)
[![MySQL2](https://img.shields.io/badge/NPM-mysql2-yellow?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/mysql2)
[![Sequelize](https://img.shields.io/badge/NPM-sequelize-yellow?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/sequelize)

[![connect-session-sequelize](https://img.shields.io/badge/NPM-connect_session_sequelize-yellow?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/connect-session-sequelize)
[![express-handlebars](https://img.shields.io/badge/NPM-express_handlebars-yellow?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/express-handlebars)
[![express-session](https://img.shields.io/badge/NPM-express_session-yellow?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/express-session)


## Table of Contents
- [Description](#description)
- [Features](#features)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Credits](#credits)
- [License](#license)

## Description

This application is a CMS-style blog site (similar to a Wordpress site), where developers can publish their blog posts and comment on other developers’ posts as well. The app follows the Model-View-Controller (MVC) paradigm in its architectural structure, uses Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

### User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

### Acceptance Criteria

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts
```

## Features

- [Node.js](https://nodejs.org/en) to execute JavaScript in CLI or *outside* of web browser.
- [Dotenv](https://www.npmjs.com/package/dotenv) to store and load environment variables (see `.env` file).
- [MySQL2](https://www.npmjs.com/package/mysql2) to connect to MySQL database.
- [Sequelize](https://www.npmjs.com/package/sequelize) for object-relational mapping (ORM) (see `models/` directory).
- [express-handlebars](https://www.npmjs.com/package/express-handlebars) to build semantic templates via `Handlebars.js` (see `views/` directory).
- [Express.js](https://expressjs.com/) to implement back-end web framework for routing, middleware, and API (see `controllers/` directory).
- [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) to add authentication.
- [express-session](https://www.npmjs.com/package/express-session) to store the session data on the client in a cookie (when user idles too long, they must re-authenticate).

## Deployment

Please visit the deployed app on Heroku: https://tech-blog-22-acd76cf7f0cb.herokuapp.com/

## Screenshots

- Homepage:

![Homepage with short articles about coding](./screenshots/homepage.png)

- View post:

![Single-post view](./screenshots/single-post.png)

- Dashboard:

![Dashboard shows the users articles](./screenshots/dashboard.png)

- Create post:

![Create post view](./screenshots/create-post.png)

- Edit post:

![Edit post view](./screenshots/edit-post.png)

## Credits

- Photo by [Prophsee Journals](https://unsplash.com/@prophsee) on [Unsplash](https://unsplash.com/photos/black-ballpoint-pen-on-white-ruled-paper-sheet-vD9Gb_H7RR8)
- Researched Stack Overflow forums and other coding resources

## License

MIT License - Copyright © 2024 apri1mayrain

[(Go back to top)](#tech-blog)
