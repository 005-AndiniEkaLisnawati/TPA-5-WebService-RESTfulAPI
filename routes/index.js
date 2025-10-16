const express = require('express');
const router = express.Router();

const TodoRoutes = require('./todoRoutes');
const authRoutes = require('./authRoutes')

router.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});

router.use('/todos', TodoRoutes);
router.use('/auth', authRoutes);

module.exports = router;

