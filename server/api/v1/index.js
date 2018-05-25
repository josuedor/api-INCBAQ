const express = require('express');
const router = express.Router();

const users = require('./users/routes');
const categorias = require('./categorias/routes');
const subcategorias = require('./subcategorias/routes');
const predios = require('./predios/routes');
const incidencias = require('./incidencias/routes');

router.use('/users', users);
router.use('/categorias', categorias);
router.use('/subcategorias', subcategorias);
router.use('/predios', predios);
router.use('/incidencias', incidencias);

module.exports = router;