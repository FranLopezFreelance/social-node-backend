const express = require('express');
const router = express.Router();

// NETWORK AND CONTROLLER
const response = require('../../../network/response');
const authController = require('./index');

// CHILD ROUTES
router.post('/login', login);

function login(req, res){
    authController.login(req.body.username, req.body.password)
    .then(token => {
        response.success(req, res, token, 200);
    })
    .catch(err => {
        response.error(req, res, 'Datos inválidos', 400);
    })
}

module.exports = router;