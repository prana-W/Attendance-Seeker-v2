const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    reg_no: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    attendance: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendance'
    }],
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;