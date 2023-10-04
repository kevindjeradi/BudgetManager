const express = require('express');
const router = express.Router();
const Balance = require('../models/balance');
const authenticate = require('../middleware/authenticate'); // Import the authentication middleware

router.use(express.json());

// Create a new balance
router.post('/', authenticate, async (req, res) => {
    try {
        const balance = new Balance({ ...req.body, userID: req.user._id });
        await balance.save();
        res.status(201).send(balance);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get all balances for the logged-in user
router.get('/', authenticate, async (req, res) => {
    try {
        const balances = await Balance.find({ userID: req.user._id });
        res.send(balances);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;