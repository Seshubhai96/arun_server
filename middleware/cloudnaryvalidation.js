const cloudnary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: process.env.CloudnaryName, 
    api_key: process.env.CloudnaryApikey, 
    api_secret: process.env.Cloudnary_SECREAT
});
module.exports=cloudnary;