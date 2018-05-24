const express = require('express');
const router = express.Router();
const users = require('./users/routes');

router.use('/users', users);

const categorias = require('./categorias/routes');

router.use('/categorias', categorias);

module.exports = router;