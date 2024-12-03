const express = require('express');
const routers = express.Router();
const rolecontroller = require('../Controller/rolecontroller');
const iauth = require('../../middleware/jwtvalidation');
 exports.router = routers
 .post('/createrole',iauth,rolecontroller.createrole)
 .post('/getrolebyid',iauth,rolecontroller.getrolebyid)
 .post('/rolelists',iauth,rolecontroller.getallroles)