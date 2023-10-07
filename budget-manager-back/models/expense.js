const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    expenses: [{
        _id: mongoose.Schema.Types.ObjectId,
        montant: Number,
        categorie: String,
        date: Date,
    }],
});

const Expense = mongoose.model('depense', ExpenseSchema, 'depenses');

module.exports = Expense;
