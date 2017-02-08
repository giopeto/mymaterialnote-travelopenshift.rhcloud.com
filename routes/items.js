/**
 * Created by george on 7/27/16.
 */
var express = require('express');
var router = express.Router();
var Items = require('../models/items');

router.get('/items', function(req, res, next) {

	var groupId = req.query.groupId;
	var name = req.query.name;
	var queryHash = {};
	if (groupId) {
		queryHash._group =groupId;
	}
	if (name) {
		queryHash.name = new RegExp(name, "i");
	}
	Items.find(queryHash).sort('-updatedAt').populate("_group").exec(function(err, data) {
		if (err)
			res.send(err);
		res.json(data);
	});
});

router.post('/items', function(req, res, next) {

	Items.create(
		req.body
		, function (err, data) {
			if (err) {
				res.send(err);
			}
			res.json(data);
		});

});

router.put('/items/:_id', function(req, res) {
	delete req.body._id;
	delete req.body.createdAt;
	Items.findByIdAndUpdate(req.params._id, {$set: req.body}, function(err, data){
		if(err){
			res.send(err);
		}
		res.json(data);
	});
});

router.get('/items/:_id', function(req, res) {
	Items.findById(req.params._id, function(err, data) {
		if (err)
			res.send(err);
		res.json(data);
	});

});

router.delete('/items/:_id', function(req, res) {
	Items.remove({
		_id: req.params._id
	}, function (err, data) {
		if (err)
			res.send(err);
		res.json({ message: 'Removed!' });
	});


});

module.exports = router;