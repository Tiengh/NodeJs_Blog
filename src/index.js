const express = require('express');
const morgan = require('morgan');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,'public')))

// Định nghĩa engine Handlebars
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'resource/views/layouts'),
  partialsDir: [
    path.join(__dirname, 'resource/views/partials')
  ]
});

// Đăng ký partials bằng handlebars
handlebars.registerPartial('header', '{{> header}}');
handlebars.registerPartial('footer', '{{> footer}}');

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));

app.get('/', (req, res) => {
  
  res.render('home');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
