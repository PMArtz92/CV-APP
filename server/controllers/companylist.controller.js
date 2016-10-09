var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');



// var mongo = require('mongoskin');
// var db = mongo.db("mongodb://localhost:27017/mycvapp", {
//     native_parser: true
// });

var db = require('./db').db;
db.bind('compaylist');

var commpaylistArray = [];

router.get('/', function(req, res) {
    commpaylistArray = []; //remove elemet in the list for every request
    db.collection('compaylist').find({}, function(err, result) {
        result.each(function(err, data) {
            if (data !== null) {
                commpaylistArray.push(data);
                console.log(data);
            } else {
                // end of the loop when null encounter
                console.log(commpaylistArray);
                return res.json(commpaylistArray);
            }
        });
    });
});

module.exports = router;
