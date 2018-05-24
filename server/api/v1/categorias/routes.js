const express = require('express');
const router = express.Router();
const controller = require('./controller');
const auth = require('./../auth');

/*
 * /api/categorias           GET  - LIST CATEGORIAS
 * /api/categorias/categoria  POST - SAVA CATEGORIA
 */

router.route('/')
    .get(controller.all)

router.route('/categoria')
    .post(controller.create)
    
module.exports = router;