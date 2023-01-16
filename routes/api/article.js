const express = require('express');
const router = express.Router();

const Article = require('../../models/Article');

router.get('/member_talk', async (req, res) => {
  try {
    const article = await Article.find({});
    if (!article) {
      return res.status(400).json({ msg: 'Article data is not available' });
    }
    return res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
