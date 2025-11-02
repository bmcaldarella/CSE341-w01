const { Router } = require('express');
const router = Router();

router.use('/contacts', require('./contacts'));

module.exports = router;
