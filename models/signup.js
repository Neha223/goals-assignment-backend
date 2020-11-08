const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const signupSchema = new Schema({
    name: String,
    fileName: String,
    details: {
        name: String,
        designation: String,
        phone: Number,
        email: String
    },
    status: String
});

module.exports = mongoose.model('signup', signupSchema);