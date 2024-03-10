const { Post } = require('../models');

const posts = [
  {
    title:  'Why MVC is so important',
    body:   `MVC allows developers to maintain a true separation of concerns, devising their
                code between the Model layer of data, the View layer for design, 
                and the Controller layer for application logic.`,
    user_id: 1,
  },
  {
    title: 'Authentication vs. Authoriation',
    body:  `There is a difference between authentication and authorization.
            Authentication means confirming your own identity, whereas
            authorization means being allowed access to the system.`,
    user_id: 3,
  },
  {
    title: 'Object-Relational Mapping',
    body: `Using ORMs is a simple way to create queries in SQL!`,
    user_id: 2,
  },
  {
    title: 'Keep routes concise',
    body:  `Each route should have a clear and specific purpose.
            Avoid writing monolithic route handlers that perform multiple unrelated tasks.
            Break down complex functionality into smaller, reusable middleware functions.`,
    user_id: 4,
  },
];

const seedPost = () => Post.bulkCreate(posts);

module.exports = seedPost;