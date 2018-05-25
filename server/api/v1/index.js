const express = require('express');
const router = express.Router();

const users = require('./users/routes');
const categorias = require('./categorias/routes');
const subcategorias = require('./subcategorias/routes');

router.use('/users', users);
router.use('/categorias', categorias);
router.use('/subcategorias', subcategorias);

module.exports = router;