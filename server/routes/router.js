'use strict'

const router = require('express').Router();
const { serverController, viewController } = require('../controllers/serverController');

router.post('/request', serverController);
router.get('/show', viewController);

module.exports = router;