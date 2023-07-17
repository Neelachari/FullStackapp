const {Router}=require("express")

const JWT =require("jsonwebtoken")

const bcrypt =require("bcrypt")

const {UserModel}=require("../Model/user.model")

require("dotenv").config()

const userRouter=Router()

userRouter.post("/register", async (req, res)=>{
   try {
    const email=req.body.email
    const Users = await UserModel.findOne(email)
    if(Users){
        res.status(400).send("User Already exist")
    }
    else{
        bcrypt.hash(req.body.password, 8, async (error, hash)=>{
            if(hash){
                const User=new UserModel({...req.body, password:hash})
                await User.save()
                res.status(200).send("The new user has been registered")
            }

        })

    }
   } catch (error) {
      res.status(400).send({error:error.message})
   }
})

userRouter.post("/login", async (req, res)=>{
    const {email, password}=req.body
    try {
        const Users= await UserModel.findOne({email})
    if(Users){
           bcrypt.compare(password, Users.password, (error, res)=>{
            if(res){
                let token =JWT.sign({userID: Users._id}, password.env.Secret)
                res.status(200).send({msg: "User logged in successfully", token})
            }
            else{
                res.status(200).send({msg:"Inncorrect password"})
            }
           })
    }
    } catch (error) {
       res.status(400).send({error:error.message})
    }
 })



module.exports= userRouter