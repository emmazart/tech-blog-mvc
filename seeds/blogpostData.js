const { BlogPost } = require('../models');

const blogpostData = [
    {
        title: 'My first blog post',
        user_id: 1
    }
];

const seedBlogPost = () => BlogPost.bulkCreate(blogpostData);

module.exports = seedBlogPost;