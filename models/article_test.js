const mongoose = require('mongoose');

const ArticleTestSchema = new mongoose.Schema(
    {
        alumni: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'alumni'
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
    }, { collection: 'article_backup' }
)

module.exports = ArticleTest = mongoose.model('article_test', ArticleTestSchema);