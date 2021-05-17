import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// let socialUserSchema = mongoose.Schema;
var bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer'},
    // createdAt: { type: String, required: true }, 
}, {timestamps: true});

// var socialSchema = new socialUserSchema({
//     provider: { type: String },
//     email: { type: String },
//     name: { type: String },
//     image: { type: String },
//     idToken: { type: String },
//     creation_dt: { type: String },
// });

// userSchema.statics.hashPassword = function hashPassword(password) {
//     return bcrypt.hashSync(password, 10);
// }

// userSchema.methods.isValid = function (hashedPassword) {
//     return bcrypt.compareSync(hashedPassword, this.password);
// }

// module.exports = mongoose.model('User', userSchema);
// module.exports = mongoose.model('SocialUser', socialSchema);

export default mongoose.model('User', userSchema, 'users');
