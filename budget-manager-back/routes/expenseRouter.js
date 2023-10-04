const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const authenticate = require('../middleware/authenticate'); // Import the authentication middleware

router.use(express.json());

// Create a new expense
router.post('/', authenticate, async (req, res) => {
    try {
        const expense = new Expense({ ...req.body, userID: req.user._id });
        await expense.save();
        res.status(201).send(expense);
    } catch (err) {
        res.status(400).send(err.message);
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

module.exports = router;