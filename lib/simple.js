var mongodb = require('mongodb');                           // Load the driver
var server = new mongodb.Server('127.0.0.1', '27017', {});  // Connection
var db = new mongodb.Db('exampleDatabase', server, {w: 1}); // Our database

// Connect
db.open(function(er) {
    if(er) throw er;
    console.log('Connected.');
});          // End db.open

exports.save = function(doc, callback) {
    db.collection('things', function(er, coll) {
        if(er) throw er;
        console.log('Connected to collection ', coll.name);
        coll.insert(doc, {safe: true}, function(e, inserted) {
            if(e) throw e;
            console.log('Document inserted.', inserted);
            callback();
        });  // End coll.insert
    });      // End db.collection
}
exports.get = function(callback) {
    db.collection('things', function(e, coll){
        if(e) callback(e);
        coll.find({}).toArray(function(er, results) {
            if(er) callback(er);
            callback(null, results);
        });
    });
}
exports.simpleProblem = function(doc, callback) {
    db.collection('things', function(er, coll) {
        if(er) throw er;
        console.log('Connected to collection ', coll.name);
        coll.insert(doc, {safe: true}, function(e, inserted) {
            if(e) throw e;
            console.log('Document inserted.', inserted);
            callback();
        });  // End coll.insert
    });      // End db.collection
}