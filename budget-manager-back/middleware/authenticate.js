// Middleware to verify JWT and protect routes
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("authenticate token: " + token);
    if (!token) return res.status(401).send('Access denied. No token provided.');
    
    try {
        console.log("authenticate token in try: " + token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("authenticate token in catch: " + token);
        console.log("Specific error thrown by jwt.verify(): " + err);
        res.status(400).send('Invalid token.');
    }
};

module.exports = authenticate;