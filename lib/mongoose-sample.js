var itemLib = require('./item_library')
  , Items;
itemLib.attach(Items);
exports.index = function(req, res) {
    var items = Items.db.all()
    .then(function(items){
        res.render('lib_sample', {items: items});
    })
    .fail(function(err){
        console.log('Error getting items.');
        res.render('lib_sample', {items: []});
    });
}
exports.getItem = function(req, res) {
    var id = req.params.id
    var items = Items.db.read(id)
    .then(function(doc){
        res.json(doc);
    })
    .fail(function(err){
        console.log('Error getting item.');
        res.status(500);
        return res.json(err);
    });
}
exports.addItem = function(req, res) {
    var data = {
        name: req.body.name
        , description: req.body.desc
        , price: req.body.price
        , added: new Date()
        , approved: false
    }
    Items.create(data)
    .then(function(res){
        return res.json({message: 'created', data:res});
    })
    .fail(function(err){
        console.log('Error adding item.')
        res.status(500);
        return res.json(err);
    });
}
exports.saveItem = function(req, res) {
    var data = {
        name: req.body.name
        , description: req.body.desc
        , price: req.body.price
        , added: new Date()
        , approved: false
    }
    Items.update(req.params.id, data)
    .then(function(res){
        return res.json({message: 'Saved', data:res});
    })
    .fail(function(err){
        res.status(500);
        return res.json(err);
    });
}

exports.approveItem = function(req, res) {
    Items.approve(req.params.id)
    .then(function(result) {
        Items.read(req.params.id)
        .then(function(doc){
            return res.json({message: 'Approved', data: doc});
        })
    })
    .fail(function(err){
        return res.json(err);
    });
}
exports.removeItem = function(req, res) {
    var id = req.params.id
    var items = Items.db.del(id)
    .then(function(doc){
        res.json(doc);
    })
    .fail(function(err){
        console.log('Error removing items.');
        res.render('lib_sample', {items: []});
    });
}
exports.findItem = function(req, res){
    var criteria = {};
    if(req.body.name) {
        criteria.name = req.body.name;
    }
    if(req.body.description) {
        criteria.description = req.body.description;
    }
    items.query(criteria)
    .then(function(docs){
        res.json(docs);
    })
    .fail(function(err){
        console.log('Error looking up items.');
        res.render('lib_sample', {items: []});
    });
}