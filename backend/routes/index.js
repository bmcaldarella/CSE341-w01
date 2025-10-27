const { Router } = require('express');
const router = Router();

router.get('/hello', (req, res) => {
  res.json({ msg: 'Hola Brandon!' });
});

module.exports = router;
