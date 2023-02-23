const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const router = express.Router();
const Alumni = require('../../models/alumni');
const Article = require('../../models/article');
const Admin = require('../../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, number, jobTitle, exp, tags, avatar, major } = req.body;

    try {
      let alumni = await Alumni.findOne({
        name,
        number,
      });
      if (alumni) {
        console.log(alumni);
        return res
          .status(400)
          .json({ errors: [{ msg: 'alumni already exists' }] });
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
  '/add_and_update_article',
  check('name', 'Alumni name is required').notEmpty(),
  check('number', 'Alumni number is required').notEmpty(),
  check('title', 'Title is required').notEmpty(),
  check('content', 'Content is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, content, avatar } = req.body;
    try {
      //  Search alumni ID
      let alumni = await Alumni.findOne({
        name: req.body.name,
        number: req.body.number,
      });

      if (!alumni) {
        console.log('No alumni');
        return res.status(400).json({ msg: 'Cannot find alumni' });
      }

      let alumniID = alumni.id;
      let articleFields = {
        alumni: alumniID,
        title: req.body.title,
        content: req.body.content,
        avatar: req.body.avatar,
      };

      // if article is already exist: update it
      if (req.body._id != null && req.body._id != '') {
        let article = await Article.findOneAndUpdate(
          { _id: req.body._id },
          { $set: articleFields }
        );
      } else {
        let article = await Article.create(articleFields);
      }
      res.send('Article added success!!');
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ msg: 'Server Errorrrr' });
    }
  }
);

router.put(
  '/update_alumni',
  check('_id', 'Alumni ID is required').notEmpty(),
  async (req, res) => {
    const error = validationResult(req.body);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      //console.log(req.body);
      const id = req.body._id;

      let alumni = await Alumni.findById(id);
      if (!alumni) {
        console.log('No alumni');
        return res.status(400).json({ msg: 'No alumni data' });
      }

      if (req.body.name != '' && req.body.name != null)
        alumni.name = req.body.name;
      if (req.body.number != '' && req.body.number != null)
        alumni.number = req.body.number;
      if (req.body.jobTitle != '' && req.body.jobTitle != null)
        alumni.jobTitle = req.body.jobTitle;
      if (req.body.exp != '' && req.body.exp != null) 
        alumni.exp = req.body.exp;
      if (req.body.avatar != '' && req.body.avatar != null)
        alumni.avatar = req.body.avatar;
      if (req.body.tags != null)
        alumni.tags = req.body.tags;
      if (req.body.major != '' && req.body.major != null)
        alumni.major = req.body.major;
      let result = await alumni.save();
      //console.log(result);
      res.json(alumni);
    } catch (e) {
      console.error(e.message);
      return res.status(400).json({ msg: 'Server Errrrrror' });
    }
  }
);

router.delete(
  '/delete_alumni',
  check('_id', 'Alumni ID is required').notEmpty(),
  async (req, res) => {
    error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      let result = await Alumni.findOneAndRemove({ _id: req.body._id });
      if (!result) {
        console.log('no alumni found');
        return res.status(400).json({ msg: 'Cannot find alumni data' });
      }
      res.send('alumni deleted');
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Errrorororor');
    }
  }
);

router.delete(
  '/delete_article',
  check('_id', 'ID is required').notEmpty(),
  async (req, res) => {
    error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      let result = await Article.findOneAndRemove({ _id: req.body._id });
      if (!result) {
        console.log('no article found');
        return res.status(400).json({ msg: 'Cannot find article data' });
      }
      res.send('article deleted');
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Errrorororor');
    }
  }
);

// add admin (be careful)
router.post(
  '/add_admin',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please enter valid email').isEmail(),
  check(
    'password',
    'please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Admin already exists' }] });
      }
      admin = new Admin({
        name: name,
        email: email,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();

      const payload = {
        admin: {
          id: admin.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ msg: 'Server Errorororor' });
    }
  }
);

module.exports = router;
