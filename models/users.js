var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var usersSchema = new Schema({
		name : {type : String, default: '', required: true},
		email : {type : String, default: '', required: true},
		password: {type : String, default: '', required: true}
	},
	{ timestamps: true }
);

usersSchema.methods.encryptPassword = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

usersSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Users', usersSchema);