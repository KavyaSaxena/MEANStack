const mongoose = require('mongoose')
const User = mongoose.model('user')
module.exports.register = (req,res,next) =>{
    var user = new User()
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if(err) 
        res.send(err)
        else{
            res.send(doc)
        }
        console.log(doc)
    })

}