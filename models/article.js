const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { collection: 'article' }
);

module.exports = Article = mongoose.model('article', ArticleSchema);
