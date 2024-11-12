const express = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = new express.Router()

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// all users list
router.get('/all-users',jwtMiddleware,userController.allUsersListController)

// user details
router.get('/user-details',jwtMiddleware,userController.userDetailsController)

module.exports = router