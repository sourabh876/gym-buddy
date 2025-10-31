const User = require('../Models/usermodel')
const jwt = require ('jsonwebtoken')

const createToken = (_id)=>{
return jwt.sign({_id}, process.env.SECRET, {expiresIn:"3d"})
}

exports.loginUser = async(req,res) => {
    const {Email,Password} = req.body

    try{
        const user = await User.login(Email,Password)

        const token = createToken(user._id)

        res.status(200).json({Email, token})
    }catch(error){
         res.status(400).json({
            error: error.message
         })
    }


}

exports.signUpUser = async (req,res) => {

    const {Email,Password} = req.body

    try{
        const user = await User.signup(Email,Password)

        const token = createToken(user._id)

        res.status(200).json({Email, token})
    }catch(error){
         res.status(400).json({
            error: error.message
         })
    }


}


