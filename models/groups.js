var mongoose = require('mongoose');

module.exports = mongoose.model('Groups', {
    name : {type : String, default: ''},
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
});