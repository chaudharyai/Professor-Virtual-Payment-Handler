const express = require('express');
const { checkHealth } = require('../controllers/healthController');
const router = express.Router();

router.get('/', checkHealth);

module.exports = router;
