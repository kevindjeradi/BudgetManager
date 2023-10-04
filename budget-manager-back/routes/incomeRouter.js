const express = require('express');
const router = express.Router();
const Income = require('../models/income');
const authenticate = require('../middleware/authenticate'); // Import the authentication middleware

router.use(express.json());

// Create a new income
router.post('/', authenticate, async (req, res) => {
    try {
        const income = new Income({ ...req.body, userID: req.user._id });
        await income.save();
        res.status(201).send(income);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get all incomes for the logged-in user
router.get('/', authenticate, async (req, res) => {
    try {
        const incomes = await Income.find({ userID: req.user._id });
        res.send(incomes);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;