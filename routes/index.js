
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var models = require("../models");


router.get('/', function(req, res) {
	models.Tasks.all().then(function(taskList) {
		res.render('index', {title: 'Express', tasks: taskList});
	});
});


/* GET Champions Data via Riot API */
router.get('/champion', function(req, res) {
	//Lets configure and request
	request({
		url: 'https://global.api.pvp.net/api/lol/static-data/oce/v1.2/champion', //URL to hit
		qs: {api_key: process.env.RIOT_API_KEY, champData: "image"}, //Query string data
		method: 'GET' //Specify the method
		//headers: { //We can define headers too
		//  'Content-Type': 'MyContentType',
		//  'Custom-Header': 'Custom Value'
		//}
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			console.log(response.statusCode, body);
			var parse = JSON.parse(body);
			res.render('champion', {result: parse});
		}
	});
});

module.exports = router;
