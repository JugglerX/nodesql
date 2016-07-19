
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var models = require('../models/index');

router.get('/', function(req, res) {
	res.render('index', {title: 'Express'});
});

module.exports = router;
