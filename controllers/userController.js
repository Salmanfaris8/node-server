const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// register
exports.registerController = async (req,res)=>{
    console.log("Inside Register controller");
    console.log(req.body);
    const {fName,lName,email,password,phoneno} = req.body
    try{
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        console.log(hashedPassword);
        
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Already existing user... Please Login!!!")
        }
        else{
            const newUser = new users({
                fName,lName,email,password:hashedPassword,phoneno
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

// login
exports.loginController = async (req,res)=>{
    console.log("Inside loginController");
    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email})
        const existingpassword = await bcrypt.compare(password,existingUser.password)
        if(existingUser && existingpassword){
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }
        else{
            res.status(404).json("Invalid Email / Password!!!")
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

// get all users 
exports.allUsersListController = async (req,res)=>{
    console.log("Inside allUsersListController");
    try{
        const allusers = await users.find({},'-password')
        res.status(200).json(allusers)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// userDetails
exports.userDetailsController = async (req,res)=>{
    console.log("Inside userDetailsController");
    const userId =req.userId
    console.log(userId);
    try{
        const userDetails = await users.findById(userId).select('-password')
        res.status(200).json(userDetails)
    }
    catch(err){
        res.status(401).json(err)
    }
}