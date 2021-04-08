var mongoose = require('mongoose');
var readerSchema = mongoose.Schema;

var schema = new readerSchema({
    name: { type: String, require: true },
    weeklyReadingGoal: { type: String, require: true },
    totalMinutesRead: { type: String, require: true },
});

module.exports = mongoose.model('Reader', schema);
