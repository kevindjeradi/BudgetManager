// models/historique.js

const mongoose = require('mongoose');

const changeSchema = new mongoose.Schema({
    activity: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const historiqueSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    changes: [changeSchema]
});

module.exports = mongoose.model('Historique', historiqueSchema);
