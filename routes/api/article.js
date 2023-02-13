const express = require('express');
const router = express.Router();

const Article = require('../../models/article');
const Alumni = require('../../models/alumni');
const ArticleTest = require('../../models/article_test');
const articleQuery = require('../../core/articleQuery');

router.get('/member_talk', async (req, res) => {
  try {
    const article = await ArticleTest.find().populate('alumni', [
      'name',
      'number',
      'jobTitle',
      'tags',
    ]);
    if (!article) {
      return res.status(400).json({ msg: 'Article data is not available' });
    }
    res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/select', async (req, res) => {
  try {
    let query = articleQuery(req);
    console.log(query);
    IDList = [];
    const alimniData = Alumni.find(query).cursor();
    for (let doc = await alimniData.next(); doc != null; doc = await alimniData.next()){
      //console.log(doc._id.valueOf());
      IDList.push(doc._id.valueOf());
    }

    //console.log(IDList.length);
    let newQuery = {
      alumni: {$in: IDList}
    };

    const articleData = await ArticleTest.find(newQuery).populate('alumni', [
      'name',
      'number',
      'jobTitle',
      'tags',
    ]);
    if (!articleData){
      return res.status(400).json({msg: "article data not found"});
    }
    res.status(200).json(articleData);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;