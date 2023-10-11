const express = require('express');
const router = express.Router();
router.use(express.json());
const Balance = require('../models/balance');
const Historique = require('../models/historique');
const authenticate = require('../middleware/authenticate'); // Import the authentication middleware
const mongoose = require('mongoose');

// Create a new balance or update existing balances for the user
router.post('/', authenticate, async (req, res) => {
    try {
        // Find the user's existing Balance document
        let userBalances = await Balance.findOne({ userID: req.user._id });

        if (userBalances) {
            // If user has an existing Balance document, push the new balance to the balances array
            const newBalance = {
                ...req.body.balances,
                _id: new mongoose.Types.ObjectId()  // Generate a new ObjectId for the balance
            };
            userBalances.balances.push(newBalance);
            await userBalances.save();

            // Add entry to historiques
            let userHistorique = await Historique.findOne({ userID: req.user._id });
            if (!userHistorique) {
                userHistorique = new Historique({ userID: req.user._id, changes: [] });
            }
            userHistorique.changes.push({
                activity: 'Nouveau solde : ' + req.body.balances.montant + ' euros'
            });
            await userHistorique.save();
            
            res.status(200).send(userBalances);
        } else {
            // If user doesn't have a Balance document, create a new one with the provided balance
            const balanceDataWithId = {
                ...req.body,
                balances: [{ ...req.body.balances, _id: new mongoose.Types.ObjectId() }],
                userID: req.user._id
            };
            const balance = new Balance(balanceDataWithId);
            await balance.save();
            res.status(201).send(balance);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
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