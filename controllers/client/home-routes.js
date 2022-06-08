const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

// homepage route
router.get('/', (req, res) => {
    console.log(req.session);

    BlogPost.findAll({
        attributes: ['id', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
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
        res.render('homepage', { blogposts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// click on blog post from homepage
router.get('/blogpost/:id', (req, res) => {
    console.log(req.session);

    BlogPost.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
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
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No blogpost found with this id' });
            res.redirect('/');
            return;
        }

        res.render('homepage', dbPostData);
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
        return;
    });
});

// login route
router.get('/login', (req, res) => {
    // if user is logged in, redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    // otherwise render login page
    res.render('login');
});

module.exports = router;