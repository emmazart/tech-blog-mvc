const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');


// GET    /dashboard
router.get('/', (req, res) => {
    // if user is not logged in, redirect to login page
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    BlogPost.findAll(req.body, {
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        // pass a single post object into the homepage template
        const blogposts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { blogposts });
    })
    .catch(err => {
        console.log(err);
        res.redirect('/')
        res.status(500).json(err);
    });
});

// POST    /dashboard/new
router.post('/new', (req, res) => {

})

module.exports = router;