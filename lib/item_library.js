var mongoose = require('mongoose');
var Item = require('../lib/item_model');
var q = require('q');
var db = {
    create: function(data) {
        var d = q.defer();
        var item = new Item(data);
        item.save(function(err, res) {
            if(err) {
                d.reject(err);
                return;
            }
            d.resolve(res);
        });
        return d.promise;
    }
    , update: function(id, data) {
        var d = q.defer();
        var item = new Item(data);
        item._id = id;
        Item.save({}, function(err, res) {
            if(err) {
                d.reject(err);
                return;
            }
            d.resolve(res);
        });
        return d.promise;
    }
    , read: function(id) {
        var d = q.defer();
        Item.findOne({_id: id}, function(err, doc) {
            if(err) {
                d.reject(err);
                return;
            }
            d.resolve(doc);
        });
        return d.promise;
    }
    , del: function(id) {
        var d = q.defer();
        Item.findOne({_id: id}, function(err, doc) {
            if(err) {
                d.reject(err);
                return;
            }
            // Do stuff before deleting, like updating logs
            doc.remove(function(e, res){
                if(e) {
                    d.reject(e);
                    return;
                }
                d.resolve(res);
            });
        });
        return d.promise;
    }
    , query: function(criteria) {
        var d = q.defer();
        if(!criteria) criteria = {};
        Item.find(criteria, function(err, res) {
            if(err) {
                d.reject(err);
                return;
            }
            d.resolve(res);
        });
        return d.promise;
    }
    , all: function() {
        var d = q.defer();
        Item.find({}, function(err, res) {
            if(err) {
                d.reject(err);
                return;
            }
            d.resolve(res);
        });
        return d.promise;
    }
    , approve: function(id){
        var d = q.defer();
        Item.findOne({_id: id}, function(err, doc){
            if(err) {
                d.reject(err);
                return;
            }
            if(!doc) {
                d.reject({message: 'No document'});
            } else {
                doc.approve(function (er, res){
                    if(er) {
                        d.reject(er);
                        return;
                    }
                    d.resolve(res);    
                });
                
            }

        })
    }
};
exports.attachDB = function(app) {
    app.db = db;
}