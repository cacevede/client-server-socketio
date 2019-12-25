'use strict'

const router = require('express').Router();
const { serverController } = require('../controllers/serverController');

router.post('/request', serverController);

module.exports = router;