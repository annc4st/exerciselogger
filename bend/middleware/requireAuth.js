const jwt  = require('jsonwebtoken')
const User = require ('../models/userModel')


const requireAuth = async (req, res, next) => {

    //verify auth
    //can grab auth property from req headers
    const {authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error : 'Authorization token required'})
    }

    //get token from authorization "Bearer lskjfslfks098sfs.slkjhfw.oisfjosd"
    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()

    } catch(error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
 }

 module.exports = requireAuth;
