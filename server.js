const path = require('path');
const express = require('express');
var cors = require('cors');
var app = express();
const connectDB = require('./config/db');
const sitemapRouter = require('./routes/sitemap');
const helmet = require('helmet');

connectDB();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api/alumni', require('./routes/api/alumni'));
app.use('/api/alumni', require('./routes/api/selection'));
app.use('/api/article', require('./routes/api/article'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/auth', require('./routes/api/auth'));
app.use(sitemapRouter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://www.googletagmanager.com/',
      ],
      scriptSrcElem: ["'self'", 'https://www.googletagmanager.com/'],
      imgSrc: ["'self'", 'https://img.youtube.com/'],
    },
  })
);

app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
