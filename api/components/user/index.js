const userController = require('./user-controller');
const store = require('../../../store/dummy');

module.exports = userController(store);