const router = require('express').Router();
// const apiRoutes = require('./api');
// const homeRoutes = require('./home-routes'); // this will be used for the homepage



// catchall
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;