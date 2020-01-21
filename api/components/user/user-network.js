const express = require('express');
const router = express.Router();

// NETWORK AND CONTROLLER
const response = require('../../../network/response');
const userController = require('./index');

// CHILD ROUTES
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', upsert);

function list(req, res){
    userController.list()
        .then(list => {
            response.success(req, res, list, 200);
        })
        .catch(err => {
            response.error(req, res, err.message, 500);
        })
}

function get(req, res){
    userController.get(req.params.id)
        .then(user => {
            response.success(req, res, user, 200);
        })
        .catch(err => {
            response.error(req, res, err, 500);
        });
}

function upsert(req, res){
    userController.upsert(req.body)
        .then(user => {
            response.success(req, res, user, 201);
        })
        .catch(err => {
            response.error(req, res, err.message, 500);
        });
}

module.exports = router;