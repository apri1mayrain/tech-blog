const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: `auU{,hA'US+])@A5T7~y4hk/72EF:V`,
  cookie: {
    maxAge: 3600000, // Regular session expires in 60 minutes
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: true,
  rolling: true, // Force the session identifier cookie to be set on every response (for idling)
  saveUninitialized: false, // Cookie will not be set on a response with an uninitialized session
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});