const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Comment assocations
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
})

// Post associations
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

// User associations
User.hasMany(Comment, {
  foreignKey: 'user_id',
});

User.hasMany(Post, {
  foreignKey: 'user_id',
});

module.exports = { User, Post, Comment };