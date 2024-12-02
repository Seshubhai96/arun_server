const express = require('express');
const rotes = express.Router();
const iauth = require('../../middleware/jwtvalidation');
const roomroutes = require('../controllers/roomcontroller');
exports.routes = rotes.post("/create",iauth, roomroutes.createroom).post('/id',iauth,roomroutes.getroombyid).post('/all',iauth,roomroutes.getallrooms).post("/editroom",iauth,roomroutes.updateroom);