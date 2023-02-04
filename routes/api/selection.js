const express = require('express');
const router = express.Router();
const Alumni = require('../../models/Alumni');

function findQuery(req){
    let search_all_number = false;
    let search_all_major = false;
    let search_all_tags = false;
    if(req.body.number == '0')
        search_all_number = true;
    if(req.body.major.length == 0)
        search_all_major = true;
    if(req.body.tags.length == 0)
        search_all_tags = true;
    console.log("search all number:", search_all_number);
    console.log("search all major:", search_all_major);
    console.log("search all tags:", search_all_tags);

    let query = {};
    if(search_all_number && search_all_major && search_all_tags)
        query = {};
    else if(search_all_number && search_all_tags)
        query = {"major": req.body.major};
    else if(search_all_number && search_all_major)
        query = {"tags": req.body.tags};
    else if(search_all_major && search_all_tags){
        query = {"number": req.body.number};
        console.log("Success");
    }
    else if(search_all_number)
        query = {"tags": req.body.tags, "major": req.body.major};
    else if(search_all_major)
        query = {"tags": req.body.tags, "number": req.body.number};
    else if(search_all_tags)
        query = {"number": req.body.number, "major": req.body.major};
    else
        query = {
            "number": req.body.number,
            "major": req.body.major,
            "tags": req.body.tags
        }
    return query;
}

router.get('/select', async (req, res) => {
    try{
        tags_length = req.body.tags.length;
        major_length = req.body.major.length;
        
        query = findQuery(req);
        console.log(query);
        const alumniData = await Alumni.find(query);

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

router.get('/search', async (req, res) => {
    try{
        let query = req.body.search;
        //console.log(query);
        const result = await Alumni.find({
            "$or": [{
                "number": {$regex: `${query}`}
            }, {
                "tags": {$regex: `${query}`}
            }, {
                "major": {$regex: `${query}`}
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

module.exports = router;