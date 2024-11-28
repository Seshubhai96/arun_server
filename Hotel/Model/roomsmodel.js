const mongoose = require('mongoose');
const { usermodel } = require('../../Auth/Models/usermodel');
const {Schema} = mongoose;
const roomodel = new Schema({
    roomnumber:{type:String,required:true,message:"{Value} can't be empty",unique:true},
    type:{type:String,required:true,message:"{Value} can't be empty"},
    createdby:{type:mongoose.Schema.ObjectId,ref:usermodel}
});
exports.roomodel = mongoose.model("Rooms",roomodel);