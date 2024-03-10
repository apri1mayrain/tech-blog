const { Comment } = require('../models');

const comments = [
  {
    body:    `Well-said! The code will be more maintainable and less likely to violate
              the Don't Repeat Yourself principle.`,
    user_id: 2,
    post_id: 1,
  },
  {
    body:    `Never mind who I am. I know who I am. Do you know who you are?`,
    user_id: 1,
    post_id: 2,
  },
  {
    body:    `It allows me to develop efficently.`,
    user_id: 4,
    post_id: 2,
  },
  {
    body:    `Great tip - thanks for sharing!`,
    user_id: 3,
    post_id: 4,
  },
];

const seedComment = () => Comment.bulkCreate(comments);

module.exports = seedComment;