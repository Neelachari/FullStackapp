const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String
})

const UserMOdel =mongoose.model("Users", UserSchema)

module.exports=UserMOdel