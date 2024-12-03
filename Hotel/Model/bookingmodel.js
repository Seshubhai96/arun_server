const mongoose  = require('mongoose');
const { roomodel } = require('./roomsmodel');
const { usermodel } = require('../../Auth/Models/usermodel');
const {Schema} = mongoose;
const bookingmodel = new Schema({
    room:{type:mongoose.Schema.ObjectId,ref: roomodel},
    date: {type:Date.now(),default:Date.now()},
    users:{
    name:{type: String,required:true,},
    }
});