const mongose = require('mongoose');
const {Schema} = mongose;
const usermodel = new Schema({
    fullname: { type: String, required: true,message:"{Value} can't be empty"},
    role : {type:String,required:true,message:"{Value} can't be empty"},
    type : {type:String,required:true,message:"{Value} can't be empty"},
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "{VALUE} is not a valid email!",
        },
    },
    password: { type: String, required: true ,
    },
});
exports.usermodel = mongose.model("User",usermodel); 