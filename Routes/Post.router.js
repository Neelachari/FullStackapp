const {Router}=require("express")

const {PostModel}=require("../Model/Post.model")
const {auth}=require("../Middleware/auth.middleware")

require("dotenv").config()

const PostRouter=Router()

PostRouter.post("/",auth, async(req, res)=>{
    try {
       const Post=await Post.create({...req.body,creater:req.userName})


       res.status(200).send(Post)
    } catch (error) {
        res.status(400).send({error: error.message})
    }

})

PostRouter.get("/",auth, async(req, res)=>{
    try {
        const query=req.queary.device
        const user=req.userName
        const  Post=await Post.find({creater:user})
        if(query){
            const data=Post.filter((e)=>e.device)
            res.status(200).send(data)
        }
        else{
            res.status(200).send(Post)
        }
    } catch (error) {
        res.status(400).send({error: error.message})
    }

})

PostRouter.patch("/update/:PostID", async(req, res)=>{
    const {PostID}=req.params
    const {userID}=req.body
    try {
        const Post =await PostModel.findByIdAndUpdate({userID,_id:PostID}, req.body)

        if(!Post){
            res.status(400).send({msg:"Post Not Found"})
        }
        else{
            res.status(200).send({msg:"Post Updated"})
        }

    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

PostRouter.delete("/delete/:PostID", async(req, res)=>{
    const {PostID}=req.params
    const {userID}=req.body
    try {
        const Delete =await PostModel.findByIdAndDelete({userID,_id:PostID}, req.body)

        if(!Delete){
            res.status(400).send({msg:"Post Not Found"})
        }
        else{
            res.status(200).send({msg:"Post Deleted"})
        }

    } catch (error) {
        res.status(400).send({error: error.message})
    }
})



module.exports= PostRouter