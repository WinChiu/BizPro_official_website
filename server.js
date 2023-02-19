const path = require('path');
const express = require('express');
var cors = require('cors');
var app = express();
const connectDB = require('./config/db');

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/alumni', require('./routes/api/alumni'));
app.use('/api/alumni', require('./routes/api/selection'));
app.use('/api/article', require('./routes/api/article'));
app.use('/api/admin', require('./routes/api/admin'));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
