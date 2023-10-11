const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const Expense = require('./models/expense');
const Balance = require('./models/balance');
const Income = require('./models/income');
const Historique = require('./models/historique');
const userRouter = require('./routes/userRouter');
const balanceRouter = require('./routes/balanceRouter');
const expenseRouter = require('./routes/expenseRouter');
const incomeRouter = require('./routes/incomeRouter');
const historiqueRouter = require('./routes/historiqueRouter');
const app = express();
const PORT = 5000;

// Load environment variables from .env file
require('dotenv').config();
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use(cors());
app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/balance', balanceRouter);
app.use('/income', incomeRouter);
app.use('/historique', historiqueRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
