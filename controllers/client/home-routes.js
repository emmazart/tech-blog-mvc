const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

// homepage route
router.get('/', (req, res) => {
    // posts?
})

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;