require('dotenv').config()
const express = require('express');
var cors = require("cors");
const server = express();
const mongoose = require('mongoose');
const authroute = require('./Auth/routes/authroute');
const roomroute = require('./Hotel/routes/roomroutes');
const roleroute = require('./Auth/routes/roleroute');

main().catch((e)=>console.log(e));

async function main() {
    await mongoose.connect(process.env.Connect);
    console.log("db connected sucessfully");
} 
server.use(cors('*'))
//server.use(express.json()); 
server.use(express.json({ limit: '50mb' })); // Set JSON payload limit
server.use(express.urlencoded({ limit: '50mb', extended: true }));
server.use(process.env.BASE_URL+"auth",authroute.router);
server.use(process.env.BASE_URL+"rooms",roomroute.routes);
server.use(process.env.BASE_URL+"role",roleroute.router);
server.listen(process.env.Port,()=>{
    console.log('server running');
});