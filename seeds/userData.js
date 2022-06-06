const { User } = require('../models');

const userdata = [
    {
        username: 'pickleparrot',
        email: 'hello@test.com',
        password: "password"
    }
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;