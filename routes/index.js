
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var models = require('../models/index');

router.get('/', function(req, res) {
	models.Tasks.findAll({}).then(function(taskList) {
		res.render('index', {title: 'Express', tasks: taskList});
	});
});

module.exports = router;
