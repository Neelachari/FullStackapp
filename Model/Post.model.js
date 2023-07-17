const mongoose=require('mongoose')

const PostSchema=mongoose.Schema({
    title :String,
    body :String,
    device :String,
    userID:String
})

const PostMOdel =mongoose.model("Post", PostSchema)

module.exports=PostMOdel