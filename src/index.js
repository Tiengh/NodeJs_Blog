const express = require('express');
const morgan = require('morgan');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;
const route = require('./routes/');
const db = require('./config/db');

//connect to db
db.connect();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Định nghĩa engine Handlebars
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'resource/views/layouts'),
  partialsDir: [path.join(__dirname, 'resource/views/partials')],
});

// Đăng ký partials bằng handlebars
handlebars.registerPartial('header', '{{> header}}');
handlebars.registerPartial('footer', '{{> footer}}');

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
