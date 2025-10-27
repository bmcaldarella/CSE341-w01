const { Router } = require('express');
const router = Router();

//router.get('/hello', (req, res) => res.json({ msg: 'Hola Brandon!' });});
router.use('/users', require('./users'));

module.exports = router;
