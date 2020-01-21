const authController = require('./auth-controller');
const store = require('../../../store/dummy');

module.exports = authController(store);