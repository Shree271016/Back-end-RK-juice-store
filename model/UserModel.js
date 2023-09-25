const mongoose = require('mongoose')
const uuidv1 = require('uuidv1')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true

    },
    salt: String,
    role: {
        type: Number,
        default: '0'
    },
    isVerified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

userSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encrypt_password(this._password)

    })
    .get(function () {

        return this._password
    })
userSchema.methods = {
    authenticate: function(password){
        return this.hashed_password === this.encrypt_password(password)
    },

    encrypt_password: function (password) {
        if (password == null) {
            return ""
        }
        try {
            return this.hashed_password = crypto.createHmac("sha256", "secret key").update(password).digest('hex')
        }
        catch{
            return ""
        }
        
    }
}
module.exports=mongoose.model("User",userSchema)
