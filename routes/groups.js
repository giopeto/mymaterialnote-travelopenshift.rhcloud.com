var express = require('express');
var router = express.Router();
var Groups = require('../models/groups');


router.get('/groups', function(req, res, data) {

    var userId = req.query.userId;
    if (!userId) {
        res.json([]);
    } else {
        Groups.find({_user: userId}).sort('name').exec(function(err, data) {
            if (err)
                res.send(err);
            res.json(data);
        });
    }

});

router.post('/groups', function(req, res, next) {
    Groups.create(
        req.body
    , function (err, data) {
        if (err)
            res.send(err);

        res.json(data);
    });
});



router.put('/groups/:_id', function(req, res) {
    delete req.body._id;
    Groups.findByIdAndUpdate(req.params._id,{$set:req.body}, function(err, data){
        if(err){
            res.send(err);
        }
        res.json(data);
    });
});

router.get('/groups/:_id', function(req, res) {
    Groups.findById(req.params._id, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});


router.delete('/groups/:_id', function(req, res) {
    Groups.remove({
        _id: req.params._id
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json({ message: 'Removed!' });
    });
});

module.exports = router;