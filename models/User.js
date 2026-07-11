const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;