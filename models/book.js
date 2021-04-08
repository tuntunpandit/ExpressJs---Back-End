var mongoose = require('mongoose');
var bookSchema = mongoose.Schema;

var schema = new bookSchema({
    title: { type: String, require: true },
    author: { type: String, require: true },
    publicationYear: { type: String, require: true },
});

module.exports = mongoose.model('Book', schema);