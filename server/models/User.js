const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    email: String,
    displayName: String,
    image: String
});

module.exports = mongoose.model('User', userSchema);
