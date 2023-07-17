const express =require("express")
const {connection} = require("./Config/db")
 const userRouter=require("./Routes/user.route")
const {auth}=require("./Middleware/auth.middleware")
const PostRouter =require("./Routes/Post.router")
require("dotenv").config()
const cors=require("cors")

const app=express()

app.use(cors())

app.use(express.json())

app.use("/users",userRouter)

app.use("/posts",auth,PostRouter)

app.listen(8080, async()=>{
    try {
        await connection
        console.log("running on port", 8080)
        console.log("server running");
    } catch (error) {
        console.log(error);
    }
})







