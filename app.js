const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
dotenv.config({ path: '.env' });
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('614842d51d7c603ebfa40ad6')
    .then((user) => {
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
    })
    .catch((error) => console.log(error));
});

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use(errorController.get404);
mongoConnect(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port' + process.env.PORT);
  });
});
