const mongoose = require('mongoose');

const BalanceSchema = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    balances: [{
        montant: Number,
        date: Date,
    }],
});

const Balance = mongoose.model('solde', BalanceSchema, 'soldes');

module.exports = Balance;