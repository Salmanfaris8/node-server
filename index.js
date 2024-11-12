require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./database/dbconnection')
// const bodyParse = require('body-parser')

const nodeServer = express()

nodeServer.use(cors())
nodeServer.use(express.json())
// nodeServer.use(bodyParse.json())
nodeServer.use(router)

const PORT = 3000 || process.env.PORT

nodeServer.listen(PORT,()=>{
    console.log(`nodeServer started at port ${PORT} and waiting for client request!!!`);
})

nodeServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>nodeServer started at port and waiting for client request!!!</h1>`)
})

