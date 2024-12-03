const mongoose = require('mongoose');
const { usermodel } = require('./usermodel');
const {Schema} = mongoose;
const rolemodel = new Schema({
    rolename:{type:String,required:true,message:"${Value} can't be empty",unique:true},
    createdby:{type:mongoose.Schema.ObjectId,ref:usermodel},
});
exports.role = mongoose.model('Role',rolemodel);