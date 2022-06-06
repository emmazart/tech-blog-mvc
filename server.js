const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// session storate will go here
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
        // expiration intervals go here?
    })
}

// express handlebars
const { engine } = require('express-handlebars');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});