const JWT=require("jsonwebtoken")

require("dotenv").config()

const auth= async(req,res, next)=>{
    const token =req.headers.authorization.split(" ")[1]
    try {
       const decode=JWT.verify(token, process.env.Secret)
       req.body.userID=decode.userID
       next()
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

module.exports={auth}