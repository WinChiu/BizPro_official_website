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

    try {
      let alumni = await Alumni.findOne({
        name,
        number,
      });
      if (alumni) {
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
      res.send('alumni added');

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

router.put(
  '/update',
  check('name', 'Name is required').notEmpty(),
  check('number', 'Number is required').notEmpty(),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const query = {
        name: req.body.name,
        number: req.body.number,
      };

      let alumni = await Alumni.findOne(query);
      if (!alumni) {
        console.log('No alumni');
        return res.status(400).json({ msg: 'No alumni data' });
      }

      if (req.body.jobTitle != '' && req.body.jobTitle != null)
        alumni.jobTitle = req.body.jobTitle;
      if (req.body.exp != '' && req.body.exp != null) alumni.exp = req.body.exp;
      if (req.body.avatar != '' && req.body.avatar != null)
        alumni.avatar = req.body.avatar;
      if (req.body.tags != '' && req.body.tags != null)
        alumni.tags = req.body.tags;
      if (req.body.major != '' && req.body.major != null)
        alumni.major = req.body.major;
      await alumni.save();
      res.json(alumni);
    } catch (e) {
      console.error(e.message);
      return res.status(400).json({ msg: 'Server Errrrrror' });
    }
  }
);

module.exports = router;
