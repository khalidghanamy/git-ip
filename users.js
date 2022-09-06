const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
    },
    ip: {
        type: String,

    }

});

const User = mongoose.model('users', userSchema);
module.exports = User;