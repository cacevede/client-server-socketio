'use strict'

const router = require('express').Router();
const { serverController, testController } = require('../controllers/serverController');

router.post('/request', serverController);

router.get('/show', testController);

module.exports = router;