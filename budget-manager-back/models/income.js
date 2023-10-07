const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    incomes: [{
        _id: mongoose.Schema.Types.ObjectId,
        montant: Number,
        categorie: String,
        date: Date,
    }],
});

const Income = mongoose.model('entree', IncomeSchema, 'entrees');

module.exports = Income;