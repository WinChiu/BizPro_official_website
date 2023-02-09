const findQuery = (req) => {
    let search_all_number = false;
    let search_all_major = false;
    let search_all_tags = false;
    if (req.body.number === '0' || req.body.number === '')
      search_all_number = true;
    if (req.body.major.length === 0) search_all_major = true;
    if (req.body.tags.length === 0) search_all_tags = true;
    console.log('search all number:', search_all_number);
    console.log('search all major:', search_all_major);
    console.log('search all tags:', search_all_tags);
  
    let query = {};
    if (search_all_number && search_all_major && search_all_tags) query = {};
    else if (search_all_number && search_all_tags)
      query = { major: req.body.major };
    else if (search_all_number && search_all_major)
      query = { tags: req.body.tags };
    else if (search_all_major && search_all_tags) {
      query = { number: req.body.number };
    } else if (search_all_number)
      query = { tags: req.body.tags, major: req.body.major };
    else if (search_all_major)
      query = { tags: req.body.tags, number: req.body.number };
    else if (search_all_tags)
      query = { number: req.body.number, major: req.body.major };
    else
      query = {
        number: req.body.number,
        major: {$all: req.body.major},
        tags: {$all: req.body.tags},
      };
    return query;
  };

 module.exports = findQuery;