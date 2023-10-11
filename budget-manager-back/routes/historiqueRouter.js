const express = require('express');
const router = express.Router();
const Historique = require('../models/historique');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, async (req, res) => {
    try {
        const historiques = await Historique.find({ userID: req.user._id }).sort({ timestamp: -1 });
        res.send(historiques);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;