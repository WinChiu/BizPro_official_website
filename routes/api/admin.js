const express = require('express');
const router = express.Router();
const Alumni = require('../../models/alumni');
const Article = require('../../models/article');
const Admin = require('../../models/admin');
const { check, validationResult } = require('express-validator');

router.post(
  '/add_alumni',
  check('name', 'Name is required').notEmpty(),
  check('number', 'Number is required').notEmpty(),
  check('jobTitle', 'Job title is required').notEmpty(),
  check('exp', 'Experience is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Empty');
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, number, jobTitle, exp, tags, avatar, major } = req.body;
   
    try{
      let alumni = await Alumni.findOne({ 
        name, number
      });
      if (alumni){
        console.log(alumni);
        return res.status(400).json({errors: [{msg: 'alumni already exists'}]});
      }

      // Todo: avatar normalization
      alumni = new Alumni({
        name,
        number,
        jobTitle,
        exp,
        tags,
        avatar,
        major,
      });
      await alumni.save();
      res.send('alumni added success!!');

      const payload = {
        alumni: {
          id: alumni.id,
        },
      };
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Errorrrrr');
    }
  }
);

router.post(
    '/add_article',
    check('alumni', 'Alumni ID is required').notEmpty(),
    check('Title', 'Title is required').notEmpty(),
    check('content', 'Content is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const {_id, title, content, avatar} = req.body;
        try{
            let query = {
                _id,
                title
            };
            let article = await Article.find(query);
            if (article){
                console.log(article);
                console.log('Article already exists!');
                return res.status(400).json({msg: "Article exists"});
            }
            article = new Article({
                _id,
                title,
                content,
                avatar
            });
            await article.save();
            res.send("Article added success!!")
        }
        catch(e){
            console.error(e.message);
            return res.status(500).json({msg: "Server Errorrrr"});
        }
    }
);

router.put(
    '/update_alumni',
    check('_id', "Alumni ID is required").notEmpty(),
    //check('name', 'Name is required').notEmpty(),
    //check('number', 'Number is required').notEmpty(),
    async (req, res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({ error: error.array() });
        }
        try{
            //console.log('id_:', req.body._id);
            const id = req.body._id;

            let alumni = await Alumni.findById(id);
            if(!alumni){
                console.log('No alumni');
                return res.status(400).json({msg: "No alumni data"});
            }

            if (req.body.jobTitle != "" && req.body.jobTitle != null)
                alumni.jobTitle = req.body.jobTitle;
            if (req.body.exp != "" && req.body.exp != null)
                alumni.exp = req.body.exp;
            if (req.body.avatar != "" && req.body.avatar != null)
                alumni.avatar = req.body.avatar;
            if (req.body.tags != "" && req.body.tags != null)
                alumni.tags = req.body.tags;
            if (req.body.major != "" && req.body.major != null)
                alumni.major = req.body.major;
            await alumni.save();
            
            res.json(alumni);
        }
        catch(e){
            console.error(e.message);
            return res.status(400).json({msg: "Server Errrrrror"});
        }
    }
);
/*
router.delete(
    '/erase',
    async (req, res) => {
        try{
            Alumni.findOneAndRemove();
        }
        catch(e){
            console.error(e.message);
            res.status(500).send('Server Errrorororor');
        }
    }
);
*/

module.exports = router;
