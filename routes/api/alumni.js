const express = require('express');
const router = express.Router();
const Alumni = require('../../models/Alumni');

router.get('/members', async (req, res) => {
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

module.exports = router;
