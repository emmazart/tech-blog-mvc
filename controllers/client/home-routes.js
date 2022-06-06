const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

// homepage route
router.get('/', (req, res) => {
    BlogPost.findAll({
        attributes: ['id', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // pass a single post object into the homepage template
        const blogposts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { blogposts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;