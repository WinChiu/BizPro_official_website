const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    alumni: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'alumni',
    },
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { collection: 'article' }
);

module.exports = Article = mongoose.model('article', ArticleSchema);