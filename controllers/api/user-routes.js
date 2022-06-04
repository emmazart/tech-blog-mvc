const router = require('express').Router();
const { User } = require('../../models/User');

router.get('/users', (req, res) => {
    User.findAll().then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }) 
})

module.exports = router;