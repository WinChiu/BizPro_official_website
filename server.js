const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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
