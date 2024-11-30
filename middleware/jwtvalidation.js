require('dotenv').config();
const jwt = require('jsonwebtoken');

const isauthencated =(req,res,next)=>{
const auth = req.header('Authorization');
//console.log(auth);
if(!auth){ 
    res.status(401).json({message:'Authorization is required'});
}try {
    const decoded = jwt.verify(auth, process.env.TOKEN_SECREAT);
    req.id = decoded.id;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      res.status(404).json({ message: 'Token Expired'});
    }
    else{
      return res.status(401).json({ message: 'Invalid token.' });
    }
  }
};
module.exports = isauthencated;