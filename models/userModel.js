const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fName:{
        type:String,
        require:true
    },
    lName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    phoneno:{
        type:String,
        require:true,
    }
})

const users = mongoose.model("users",userSchema)

module.exports = users