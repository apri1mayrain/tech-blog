const { Post } = require('../models');

const posts = [
  {
    title:  'Why MVC is so important',
    body:   `MVC allows developers to maintain a true separation of concerns, devising their
                code between the Model layer of data, the View layer for design, 
                and the Controller layer for application logic.`,
    published_date: '2024-3-1',
    user_id: 1,
  },
  {
    title: 'Authentication vs. Authorization',
    body:  `There is a difference between authentication and authorization.
            Authentication means confirming your own identity, whereas
            authorization means being allowed access to the system.`,
    published_date: '2024-3-5',
    user_id: 3,
  },
  {
    title: 'Object-Relational Mapping',
    body: `Using ORMs is a simple way to create queries in SQL!`,
    published_date: '2024-3-6',
    user_id: 2,
  },
  {
    title: 'Keep routes concise',
    body:  `Each route should have a clear and specific purpose.
            Avoid writing monolithic route handlers that perform multiple unrelated tasks.
            Break down complex functionality into smaller, reusable middleware functions.`,
    published_date: '2024-3-10',
    user_id: 4,
  },
];

const seedPost = () => Post.bulkCreate(posts);

module.exports = seedPost;