const express = require('express');
const router = express.Router();
//const config = require('config');

const Alumni = require('../../models/Alumni');

router.get('/members', async (res, req) => {
  try {
    const alumni = await Alumni.find({});
    if (!alumni) {
      return res.status(400).json({ msg: 'No alumni data available' });
    }
    return res.json(alumni);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
