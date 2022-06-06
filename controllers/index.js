const router = require('express').Router();
const apiRoutes = require('./api');
const clientRoutes = require('./client');
// const homeRoutes = require('./home-routes'); // this will be used for the homepage

router.use('/api', apiRoutes);
router.use('/', clientRoutes);

// catchall
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;