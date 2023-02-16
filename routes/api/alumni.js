const express = require('express');
const router = express.Router();
const Alumni = require('../../models/alumni');
const { error } = require('jquery');

router.get('/members', async (req, res) => {
  try {
    const alumniData = await Alumni.find();
    if (!alumniData) {
      return res.status(400).json({ msg: 'No alumni data available' });
    }
    return res.json(alumniData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// For temporary usage
router.post('/updateTags', async (req, res) => {
  try {
    const result = await Alumni.updateOne(
      { name: req.body.name, number: req.body.number },
      { $set: { tags: req.body.tags } }
    );
    console.log(result);
    if (result.modifiedCount === 0)
      return res.status(400).json({ msg: 'No alumni data has bean updated' });
    return res.status(400).json({ msg: `Update ${modifiedCount} Alumni` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
