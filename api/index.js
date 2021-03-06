// APP
const express = require('express');
const app = express();

// CONFIG
const bodyParser = require('body-parser');
const config = require('../config.js');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

app.use(bodyParser.json());

// NETWORKS
const userNetwork = require('./components/user/user-network');
const authNetwork = require('./components/auth/auth-network');

// ROUTES
app.use('/api/user', userNetwork);
app.use('/api/auth', authNetwork);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Serve
app.listen(config.api.port, () => {
    console.log("Server run on port ", config.api.port);
});
