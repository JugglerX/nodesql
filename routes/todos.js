var express = require('express');
var router = express.Router();
var models = require("../models/index");

router.get('/todos', function(req, res) {
	models.Todo.findAll({}).then(function(todos) {
		res.render('todos', {todos: todos});
	});
});

router.post('/todos', function(req, res) {
	models.Todo.create({
		title: req.body.title,
		UserId: req.body.user_id
	}).then(function(todo) {
		models.Todo.findAll({}).then(function(todos) {
			res.render('todos', {todos: todos});
		});
	});
});

router.put('/todo/:id', function(req, res) {
	models.Tasks.find({
		where: {
			id: req.params.id
		}
	}).then(function(task) {
		if(task) {
			task.updateAttributes({
				title: req.body.title,
				completed: req.body.completed
			}).then(function(task) {
				res.send(task);
			});
		}
	});
});

router.delete('/task/:id', function(req, res) {
	models.Tasks.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(task) {
		res.json(task);
	});
});

module.exports = router;