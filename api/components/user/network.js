const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');

router.get('/:id', list);
router.get('/', get);
router.post('/', upsert);
router.put('/', upsert);

function list(req, res){
    controller.get(req.params.id)
        .then(user => {
            response.success(req, res, user, 200);
        })
        .catch(err => {
            response.error(req, res, err, 500);
        });
}

function get(req, res){
    controller.list()
        .then(list => {
            response.success(req, res, list, 200);
        })
        .catch(err => {
            response.error(req, res, err.message, 500);
        })
}

function upsert(){
    controller.upsert(req.body)
        .then(user => {
            response.success(req, res, user, 201);
        })
        .catch(err => {
            response.error(req, res, err.message, 500);
        });
}

module.exports = router;