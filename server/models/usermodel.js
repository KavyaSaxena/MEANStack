const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true,
        minlength: [4, 'Password must be atleast 4 charater long']
    },
    saltSecret : String
})

//Custom valid for email
 userSchema.path('email').validate((val) =>{
     emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     return emailRegex.test(val)

 }, 'Invalid e-mail.')
//Events
userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(this.password, salt, (err, hash) =>{
            this.password = hash
            this.saltSecret = salt
            next()
        })
    }) 
})
const exp= require('../config/keys.js').JWT_EXP

const secret= require('../config/keys.js').JWT_SECRET
//Methods
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateJwt = function(){
    return jwt.sign({_id: this._id},
        secret,
        {
            expiresIn: exp
        })
}

mongoose.model('user', userSchema)