const express = require("express")
const {userRegister, forgetPassword, signOut, verifyEmail, getUserList, getUserDetails, getUserByEmail, getUserByUsername,  signIn}=require('../Controller/userController')
const { userCheck, validationCheck } = require("../vallidators/Validation")
const router = express.Router()
router.post ('/register',userCheck,validationCheck, userRegister)
router.get('/verifyEmail/:token',verifyEmail)
router.post('/forgetpassword',forgetPassword)
router.post('/signin',signIn)
router.get('/signout',signOut)
router.get('/getuserlist',getUserList)
router.get('/getuserdetails/:id',getUserDetails)
router.post('/getuserbyemail',getUserByEmail)
router.post('/getuserbyusername',getUserByUsername)

module.exports=router
  