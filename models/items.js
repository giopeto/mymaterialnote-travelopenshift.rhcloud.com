var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemsSchema = new Schema({
    name : {type : String, default: ''},
    description : {type : String, default: ''},
    _group: {type: mongoose.Schema.Types.ObjectId, ref: 'Groups'}
},
    { timestamps: true }
);
module.exports = mongoose.model('Items', itemsSchema);


