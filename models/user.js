var mongoose = require('mongoose');
var userRegSchema = mongoose.Schema;
var socialUserSchema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new userRegSchema({
    email: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    creation_dt: { type: String, require: true },
});

var socialSchema = new socialUserSchema({
    provider: { type: String },
    email: { type: String },
    name: { type: String },
    image: { type: String },
    idToken: { type: String },
    creation_dt: { type: String },
});

schema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

schema.methods.isValid = function (hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}

module.exports = mongoose.model('User', schema);
module.exports = mongoose.model('SocialUser', socialSchema);
