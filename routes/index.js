var simple = require('../lib/simple');
var items = {};
require('../lib/item_library').attachDB(items);
/*
 * GET home page.
 */
var doc = {name: 'Thing', description: 'Thing to insert'};

exports.index = function(req, res){
  return res.render('index', { title: 'Node.js/MongoDB examples' });
};

exports.simple = function(req, res) {
    simple.get(function(e, data) {
        if(e) throw e;
        return res.render('simple', {title: 'Simple MongoDB example', data: data, doc: doc});
    });
}
exports.simpleSave = function(req, res) {
    var data;
    if(req.body.email) {
        data = req.body;
    } else {
        data = doc;
    }
    simple.save(data, function(e, results) {
        if(e) throw e;
        simple.get(function(er, data){
            if(er) throw er;
            return res.render('simple', {title: 'Simple MongoDB example', data: data, doc: doc});
        });
    });
}

exports.mongoose = function(req, res) {
    items.db.all()
    .then(function(data){
        return res.render('mongoose', {data: data});
    })
    .fail(function(er){
        return res.render('mongoose', {err: {message: 'Error fetching data.'}});
    })
}
exports.saveAsMongooseModel = function(req, res) {
    var data = req.body;
    items.db.create(data)
    .then(function(result) {
        console.log('Saved: ', result);
        items.db.all()
        .then(function(data) {
            console.log('all');
            res.render('mongoose', {data: data});
        })
        .fail(function(er){
            throw er;
        });
    })
    .fail(function(er){
        console.log('Error on save.', er);
        res.render('mongoose', {err: er, data: []});
    });
    
}