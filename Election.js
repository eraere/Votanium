const mongoose = require('mongoose');

const ElectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    candidates: [{
        name: String,
        voteCount: {
            type: Number,
            default: 0
        }
    }]
});

module.exports = mongoose.model('Election', ElectionSchema); 