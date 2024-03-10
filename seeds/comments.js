const { Comment } = require('../models');

const comments = [
  {
    body:    `Well-said! The code will be more maintainable and less likely to violate
              the Don't Repeat Yourself principle.`,
    published_date: '2024-3-3',
    user_id: 2,
    post_id: 1,
  },
  {
    body:    `Never mind who I am. I know who I am. Do you know who you are?`,
    published_date: '2024-3-7',
    user_id: 1,
    post_id: 2,
  },
  {
    body:    `It allows me to develop efficently.`,
    published_date: '2024-3-8',
    user_id: 4,
    post_id: 2,
  },
  {
    body:    `Great tip - thanks for sharing!`,
    published_date: '2024-3-10',
    user_id: 3,
    post_id: 4,
  },
];

const seedComment = () => Comment.bulkCreate(comments);

module.exports = seedComment;