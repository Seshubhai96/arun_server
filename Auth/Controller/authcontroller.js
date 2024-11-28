require('dotenv').config()
const user = require('../Models/usermodel');
const model = user.usermodel;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const user = new model(req.body);
        const useralreadyesits =  await model.findOne({email: user.email});
        if (useralreadyesits!=null) {
            res.status(200).json({
                data: useralreadyesits,
                message: "User already registered you can login",
            });
        }
        else {
            if(validatePassword(user.password)){
                const salt = await bcrypt.genSalt();
                const hasp = await bcrypt.hash(user.password,salt);
                user.password = hasp;
                //console.log(user.toJSON());
                await user.save();
                res.status(200).json({
                    data: user,
                    message: "User registered sucessfully"
                });
            }
            else{
                res.status(200).json({
                    data:null,
                    message:'Password is not valid'
                });
            }
            
        }
    } catch (err) {
        res.status(400).json({
            data: err,
            message: "Failed to register users",
        });
    }
}

const createtoken=(id)=>{
return jwt.sign({id},process.env.TOKEN_SECREAT,{
    expiresIn:'6h',

});
};

exports.getbyid = async(req,res)=>{
    try {
        //console.log(req.id);
        const isuserfound = await model.findById(req.id);
        if(isuserfound!=null){
            res.status(200).json({
                data:isuserfound,
                message:"User data fetched Sucessfully"
            });
        }
        else{
            res.status(200).json({
                data:null,
                message:"No record Found"
            })
        }
    } catch (error) {
        res.status(401).json({
            data:null,
            message:"Failed to fetch user record"
        })
    }
}

exports.login = async(req,res)=>{
    try {
        const isuserfound = await model.findOne({email:req.body.email});
        if(isuserfound!=null){
            const validatepassword = await bcrypt.compare(req.body.password,isuserfound.password);
            if(validatepassword){
                res.status(200).json({
                    data:{user:isuserfound,token:createtoken(isuserfound._id)},
                    message:"Logged In Sucessfully"
                });
            }
            else{
                res.status(401).json({
                    data:null,
                    message:'Password is incorrect'
                }); 
            }
            
        }
        else{
            res.status(401).json({
                data:null,
                message:'no user found with this email'
            });
        }
    } catch (er) {
        res.status(401).json({
            data:null,
            message:'Failed to Login'
        });
    }
}

exports.getall = async(req,res)=>{
    try {
        // console.log(req.id);
        const users = await model.find();
        res.status(200).json({
          data: { users },
          message: "user records",
        });
      } catch (error) {
        res.status(400).json({
          data: error,
          message: "something went wrong",
        });
      }
}

function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

