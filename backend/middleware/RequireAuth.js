const User = require("../Models/usermodel")
const jwt = require("jsonwebtoken")


const requireAuth = async (req,res,next) => {

    const {authorization} = req.headers

    if(!authorization){
       return res.status(401).json({error: "Authentication Token required"})
    }

    //bearer klassa.klaf.iojaee

     const token = authorization.split(' ')[1]


     try{
          const {_id} = jwt.verify(token, process.env.SECRET)
          req.user = await User.findOne({_id}).select("_id")
          next()
     }catch(error){
          console.log(error)
          res.status(401).json({error: "Request is not Authrised"})
     }

}

module.exports = requireAuth