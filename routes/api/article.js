const express = require('express');
//const Alumni = require('../../models/alumni');
const router = express.Router();
const Article = require('../../models/article');
const ArticleTest = require('../../models/article_test');

router.get('/member_talk', async (req, res) => {
  try {
    const article = await Article.find({});
    if (!article) {
      return res.status(400).json({ msg: 'Article data is not available' });
    }
    res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/test', async (req, res) => {
  try {
    const tmp_article = await ArticleTest.find().populate('alumni', [
      'name',
      'number',
      'jobTitle',
      'tags',
    ]);
    if (!tmp_article) {
      return res.status(400).json({ msg: 'Article data is not available' });
    }
    res.status(200).json(tmp_article);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error!');
  }
});

module.exports = router;
