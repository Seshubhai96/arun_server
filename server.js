require('dotenv').config()
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const authroute = require('./routes/authroute');
const roomroute = require('./routes/roomroutes');

main().catch((e)=>console.log(e));

async function main() {
    await mongoose.connect(process.env.Connect);
    console.log("db connected sucessfully");
} 
server.use(express.json());
server.use(process.env.BASE_URL+"auth",authroute.router);
server.use(process.env.BASE_URL+"rooms",roomroute.routes);
server.listen(process.env.Port,()=>{
    console.log('server running');
});