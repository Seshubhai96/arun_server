const express = require('express');
const routers = express.Router();
const authcontroller = require('../Controller/authcontroller');
const iauth = require('../../middleware/jwtvalidation');
 const route =  authcontroller;
 exports.router = routers
 .post('/signup',route.register)
 .post('/getbyid',iauth,route.getbyid)
 .post('/list',iauth,route.getall)
 .post('/login',route.login);