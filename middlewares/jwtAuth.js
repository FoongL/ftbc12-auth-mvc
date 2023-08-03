const jwt = require('jsonwebtoken')

const jwtAuth = (req, res, next)=>{
    try{
    const token = req.headers.authorization.split(' ')[1]
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log('verified Token:', verifiedToken)
    next()
    } catch(err){
        // expired / invalid tokens
        return res.status(403).json({success: false, msg:"invalid jwt", accessToken: false})
    }
}

module.exports = jwtAuth