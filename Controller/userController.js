const User = require('../model/UserModel')
const Token = require('../model/TokenModel')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const exp = require('constants')
//  authentation 
const jwt = require('jsonwebtoken')
//  authorazatin to allow users to do something
const { expressjwt } = require('express-jwt')
// register



exports.userRegister = async (req, res) => {
    // check if email already exists
    let user = await User.findOne({ emaila: req.body.email })
    if (user) {
        return res.status(400).json({ error: "Email already registered .try different email" })
    }
    // check if user name is already taken
    user = await User.findOne({ username: req.body.username })
    if (user) {
        return res.status(400).json({ error: "User name not available .try different username" })
    }
    // register new user if email and username  are avalilable
    let userToRegister = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password

    })
    // Generate token for verification
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: userToRegister._id
    })
    // Save token in database
    token = await token.save()
    //  return if token is not saved
    if (!token) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    // Save user in database

    userToRegister = await userToRegister.save()


    // return if user is not saved/registered
    if (!userToRegister) {
        return res.status(400).json({ error: "something went wrong" })
    }
    // Send email if user is registered and token is also saved
    //  const url = `http://localhost:3000/verifyEmail/${token.token}` 
     const url = `${process.env.FRONTEND_URL}/${token.token}`
    sendEmail({ 
        from: "noreplay@something.com",
        to: userToRegister.email,
        sunjects: "Verification Email", 
        text: "Click on the following link to veryfy your email",
        html: `<a href ='${url}' ><button>Verify Email</button></a> `

    })
    // send registered user to front end
    res.send(userToRegister)
}



//  To Verify user 
exports.verifyEmail = async (req, res) => {
    // check if token is valid or not
    let token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "Token not found or may have expired" })
    }

    // find the user associated with the token
    // let user = await User.findOne({_id:token.user})
    let user = await User.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "User not found" })
    }
    // check if user is already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "User already verified .Ligin to continue" })
    }
    // verify if user is not verified 
    user.isVerified = true
    user = await user.save()

    if (!user) {
        return res.status(400).json({ error: "Failed to verify.Please try again later." })
    }
    //  send success message to frontend
    res.send({ message: "User verified successfully" })
}


// forget password
exports.forgetPassword = async (req, res) => {

    //  check if email is register or not
    let user = await User.findOne({ email: req.body.email })
    //  return error if email is not registered
    if (!user) {
        return res.status(400).json({ error: "Email not registered" })
    }
    // genetrate token if registered
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    // save garne 
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "something went wrong" })
    }
    // Send password reset link to email
    let url = `http://localhost:5000/resetpassword/${token.token}`
    sendEmail({
        from: "noreply@something.com",
        to: user.email,
        subject: "password Reset Link",
        text: `click on  the following link or copy paste it in browser to reset passord ${url}`,
        html: `<a href='${url}'><button>Reset Password</button></a>`

    })
    // send message to frontend
    res.send({ message: "password reset link has been sent to your email" })
}
// reset password
exports.resetPassword = async (req, res) => {
    // check if token is valid or not
    let token = await Token.findOne({ token: req.params.token })
    if (!token
    ) {
        return res.status(400).json({ erroe: "Invalid token or token may have expired" })
    }
}

//  sign In process
// sign in process
exports.signIn = async (req, res) => {
    // destructuring object to get email and password from body
    const { email, password } = req.body
    // check email
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(400).json({ error: "Email not registered" })
    }
    // check password
    if (!user.authenticate(password)) {
        return res.status(400).json({ error: "Email and password do not match" })
    }
    // check if verified or not
    if (!user.isVerified) {
        return res.status(400).json({ error: "User not verified." })
    }
    // generate login token
    let token = jwt.sign({ user: user._id, role: user.role }, process.env.JWT_SECRET)
    // set cookie
    res.cookie('myCookie', token, { expire: Date.now() + 86400 })
    // return information to user
    const { _id, username, role } = user
    res.send({ token, user: { _id, username, email, role } })
}

// signout process
exports.signOut = (req, res) => {
    res.clearCookie('myCookie')
    res.send({ msg: "Signed out successfully" })
}






//  authorization
exports.authorize = expressjwt({
    algorithms: ['HS256'],
    secret: process.env.JWT_SECRET
})


/*
authentication - to identify user
    to authenticate, we use email, password, username , phone number, etc
    package: jsonwebtoken(jwt)

authorization - to allow user to access routes
    to authorize we use special authorization tokens
    package: jsonwebtoken, expressJWT

*/
// userlist
exports.getUserList = async(req,res)=>{
    let user = await User.find()
    if (!user){
        return res.status(400).json({error:"something wwent wrong"})
    }
    res.send(user)
}


// user detail
exports.getUserDetails = async(req,res)=>{
    let user =await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    } 
    res.send(user)
}
// find by email
exports.getUserByEmail = async(req,res)=>{
    let user =await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    } 
    res.send(user)
}
// find by userName
exports.getUserByUsername = async(req,res)=>{
    let user =await User.findOne({username:req.body.username})
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    } 
    res.send(user)
}





