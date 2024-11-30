const mongoose = require('mongoose');
const { Schema } = mongoose;
const imagemodel = new Schema({
    imagepath: {
        type: String,
        default:null,
    },
    imagebuffer: {
        type: Buffer,
        default:null,
    }
});
exports.model = imagemodel;