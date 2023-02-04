const express = require('express');
const router = express.Router();
const Alumni = require('../../models/Alumni');

router.get('/select', async (req, res) => {
    try{
        //console.log(req.body);
        tags_length = req.body.tags.length;
        major_length = req.body.major.length;
        
        const alumniData = await Alumni.find({
            "number": req.body.number,
            "major": req.body.major,
            "tags": req.body.tags,
        });
        if(!alumniData){
            res.status(400).json({ msg: 'No alumni data available' });
        }
        res.status(200).json(alumniData);
    }
    catch(e){
        console.error(e.message);
        res.status(500).json({msg: "Server Error..."});
    }
});

/*
router.get('/search', async (req, res) => {
    try{
        query = req.body.search;
        const result = await Alumni.find({
            "$or": [{
                ""
            }, {
                //
            }
            ]
        });
        if(!result){
            res.status(400).json({ msg: 'No alumni data available' });
        }
        res.status(200).json(result);
    }
    catch(e){
        console.error(e);
        res.status(500).json({msg: "Server Error!"});
    }
});

*/

module.exports = router;