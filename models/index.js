const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// define blogpost & user associations
User.hasMany(BlogPost, {
    foreignKey: 'user_id'
});

BlogPost.belongsTo(User, {
    foreignKey:'user_id'
});

// comments belong to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// users have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// comments belong to one blogpost
Comment.belongsTo(BlogPost, {
    foreignKey: 'post_id'
});

// blog posts have many comments
BlogPost.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, BlogPost, Comment };