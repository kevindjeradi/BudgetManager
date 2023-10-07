const express = require('express');
const router = express.Router();
router.use(express.json());
const Expense = require('../models/expense');
const authenticate = require('../middleware/authenticate'); // Import the authentication middleware
const mongoose = require('mongoose');

// Create a new expense or update existing expenses for the user
router.post('/', authenticate, async (req, res) => {
    try {
        // Find the user's existing Expense document
        let userExpenses = await Expense.findOne({ userID: req.user._id });

        if (userExpenses) {
            // If user has an existing Expense document, push the new expense to the expenses array
            const newExpense = {
                ...req.body.expenses,
                _id: new mongoose.Types.ObjectId()  // Generate a new ObjectId for the expense
            };
            userExpenses.expenses.push(newExpense);
            await userExpenses.save();
            res.status(200).send(userExpenses);
        } else {
            // If user doesn't have an Expense document, create a new one with the provided expense
            const expenseDataWithId = {
                ...req.body,
                expenses: [{ ...req.body.expenses, _id: new mongoose.Types.ObjectId() }],
                userID: req.user._id
            };
            const expense = new Expense(expenseDataWithId);
            await expense.save();
            res.status(201).send(expense);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all expenses for the logged-in user
router.get('/', authenticate, async (req, res) => {
    try {
        const expenses = await Expense.find({ userID: req.user._id });
        res.send(expenses);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete a specific expense for the logged-in user
router.delete('/:expenseId', authenticate, async (req, res) => {
    try {
        const { expenseId } = req.params;
        const userExpenses = await Expense.findOne({ userID: req.user._id });

        if (!userExpenses) {
            return res.status(404).json({ error: "No expenses found for the user." });
        }

        // Filter out the expense to be deleted
        const expenseToDelete = userExpenses.expenses.find(expense => expense._id.toString() === expenseId);
        if (!expenseToDelete) {
            return res.status(404).json({ error: "Expense not found." });
        }
        userExpenses.expenses = userExpenses.expenses.filter(expense => expense._id.toString() !== expenseId);

        await userExpenses.save();
        res.status(200).send(userExpenses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;