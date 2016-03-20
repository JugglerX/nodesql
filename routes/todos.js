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

router.get('/todo/:id', function(req, res) {
	models.Todo.find({
		where: {
			id: req.params.id
		}
	}).then(function(todo) {
		res.render('todo', {todo: todo});
	});
});

router.put('/todo/:id', function(req, res) {
	models.Todo.find({
		where: {
			id: req.params.id
		}
	}).then(function(todo) {
		if(todo) {
			todo.updateAttributes({
				title: req.body.title,
				completed: req.body.complete
			}).then(function(todo) {
				res.send(todo);
			});
		}
	});
});

router.delete('/todo/:id', function(req, res) {
	models.Todo.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(todo) {
		res.json(todo);
	});
});

module.exports = router;