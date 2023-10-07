const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Income = require('../models/income');
const authenticate = require('../middleware/authenticate');

router.use(express.json());

// Create a new income or update existing incomes for the user
router.post('/', authenticate, async (req, res) => {
    try {
        console.log("\nUser ID:", req.user._id);
        let userIncomes = await Income.findOne({ userID: req.user._id });

        const newIncome = {
            ...req.body.incomes,
            _id: new mongoose.Types.ObjectId()
        };

        if (userIncomes) {
            userIncomes.incomes.push(newIncome);
            await userIncomes.save();
            res.status(200).send(userIncomes);
        } else {
            const income = new Income({
                incomes: [newIncome],  // Since incomes is an array, we wrap the newIncome in an array
                userID: req.user._id
            });
            await income.save();
            res.status(201).send(income);
        }
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

// Delete a specific income for the logged-in user
router.delete('/:incomeId', authenticate, async (req, res) => {
    try {
        const { incomeId } = req.params;
        console.log("Delete route hit for income ID:", incomeId);
        const userIncomes = await Income.findOne({ userID: req.user._id });

        if (!userIncomes) {
            return res.status(404).json({ error: "No incomes found for the user." });
        }

        const incomeToDelete = userIncomes.incomes.find(income => income._id.toString() === incomeId);
        if (!incomeToDelete) {
            return res.status(404).json({ error: "Income not found." });
        }
        userIncomes.incomes = userIncomes.incomes.filter(income => income._id.toString() !== incomeId);

        await userIncomes.save();
        res.status(200).send(userIncomes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;