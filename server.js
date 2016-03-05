var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = './webpack.config.js'

var app = express();
compiler = webpack(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

app.use(express.static(path.join(__dirname, '/dist')));  
app.use(webpackMiddleware(compiler));  
app.use(webpackHotMiddleware(compiler));


app.listen(process.env.PORT || 3000);

