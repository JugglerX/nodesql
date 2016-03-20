
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var models = require('../models/index');

router.get('/champions', function(req, res) {
	models.Champion.findAll({}).then(function(championList) {
		res.render('champion', {champions: championList});
	});
});

/* GET Champions Data via Riot API */
router.get('/champions/import', function(req, res) {
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
			// console.log(response.statusCode, body);
			// console.log(response);
			// console.log(body);
			// console.log(JSON.parse(body));
			var createChampion = function(obj) {
				models.Champion.create({
					championId: obj.id,
					key: obj.key,
					name: obj.name,
					title: obj.title
				});
			}
			var parse = JSON.parse(body);
			var champions = parse.data;
			for (var key in champions) {
				console.log(key);
				createChampion(champions[key]);
				// for (var subkey in champions[key]) {
					// var value = champions[key][subkey];
					// console.log(subkey, value);
				// }
			}
			res.json(body);
		}
	});
});

module.exports = router;
