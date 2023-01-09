const path = require('path');
const express = require('express');
const app = express();
<<<<<<< HEAD
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();
=======
const PORT = process.env.PORT || 3000;
>>>>>>> d3a16f0ef8f09e8b962c5ca3e6cff7385b624a6a

app.use(express.static(path.join('client/build')));

if (process.env.NODE_DEV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname.anchor, 'client', 'build', 'index.html')
    );
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
