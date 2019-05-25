//
// React Test Bench - Server (Node.JS & Express.JS), 2019
//

// Require the dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initiate server
const app = express();

// Set global variables
global.__basedir = __dirname;

// Set up webpack hot reload
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);
app.use(webpackDev(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHot(compiler));

// Set up middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));

// Return index.html on any GET request
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// Start server
app.listen(8080, () => console.log(`CommEnt Signage server running on port 8080`));
