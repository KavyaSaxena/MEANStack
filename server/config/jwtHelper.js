const jwt = require('jsonwebtoken')
const secret= require('../config/keys.js').JWT_SECRET

module.exports.verifyJwtToken = (req, res, next)=>{
    var token
    if('authorization' in req.headers)
    token = req.headers['authorization'].split(' ')[1]
    if(!token)
    return res.status(403).send({auth: false, message:'No token provided'})
    else {
        jwt.verify(token,secret,
            (err, decoded) => {
                if(err)
                return res.status(500).send({auth: false, message: 'Token authorization failed'})
                else{
                    req._id = decoded._id
                    next()
                }
            } )
    }
}