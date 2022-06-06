const sequelize = require('../config/connection');
const seedBlogPost = require('./blogpostData');
const seedUser = require('./userData');

const seedAll = async () => {
    await sequelize.sync({ force: true});

    await seedUser();

    await seedBlogPost();

    process.exit(0);
};

seedAll();