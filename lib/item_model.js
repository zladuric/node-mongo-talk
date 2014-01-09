var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/examples');
var itemSchema = mongoose.Schema({
    name: {
        type: String
        , required: true
    }
    , description: String
    , price: {
        type: Number
        , default: 0
    }
    , added: Date
    , available: Boolean
});
itemSchema.methods.approve = function() {
    this.approved = true;
}

module.exports = mongoose.model('users', itemSchema);