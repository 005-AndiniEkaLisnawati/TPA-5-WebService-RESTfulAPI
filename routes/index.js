const express = require('express');
const router = express.Router();

const TodoRoutes = require('./todoRoutes');

router.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});

router.use('/todos', TodoRoutes);

module.exports = router;

