const express = require('express');
const router = express.Router();
const Alumni = require('../../models/Alumni');

router.get('/update', async (req, res) => {
  try {
    const query = { number: '1' };
    const update = { $rename: { avatar: 'avatar' } };
    const FieldStatus = Alumni.updateMany(query, update);
    if (FieldStatus) {
      //res.status(200).send({msg: "success!!\n"});
      AlumniData = await Alumni.find({});
      if (!AlumniData) {
        console.log('No data!');
      } else {
        console.log(AlumniData);
        res.json(AlumniData);
      }
    } else {
      console.log('update failed');
      res.status(400).send({ msg: 'failed' });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
