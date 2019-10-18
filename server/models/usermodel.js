const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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
mongoose.model('user', userSchema)