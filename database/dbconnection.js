const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Atlas connected successfully with nodeServer");
}).catch(err=>{
    console.log("MongoDB Atlas connected failed");
    console.log(err);
})