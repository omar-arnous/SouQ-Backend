const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/products');
});

router.get('/404', (req, res) => {
  res.status(404).json({ message: 'Page Not Found' });
});

router.get('/500', (req, res) => {
  res
    .status(500)
    .json({ message: 'Internal Server Error, check your connection' });
});

module.exports = router;
