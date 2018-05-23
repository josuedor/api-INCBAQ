const express = require('express');
const router = express.Router();
const controller = require('./controller');
const auth = require('./../auth');

/*
 * /api/users           GET  - LIST USER
 * /api/users/signup    POST - SIGNUP
 * /api/users/login     POST - LOGIN
 */

router.route('/')
    .get(controller.all)

router.route('/signup')
    .post(controller.create)

router.route('/login')
    .post(controller.login)

router.route('/profile')
    .get(auth, controller.profile)
    
module.exports = router;