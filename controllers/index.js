const router = require('express').Router();
const { appendFile } = require('fs');
const apiRoutes = require('./api');
// const homeRoutes = require('./home-routes'); // this will be used for the homepage

router.use('/api', apiRoutes);

// catchall
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;