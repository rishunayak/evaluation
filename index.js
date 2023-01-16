require("dotenv").config()
const express=require("express");
const cors=require("cors");
const connect = require("./Config/config");
const userRoute=require("./Routes/user.route")
const postRoute=require("./Routes/post.route")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",userRoute)
app.use("/posts",postRoute)


app.get("/",(req,res)=>
{
    res.send("Welcome to Server");
})

app.listen(process.env.PORT,async()=>
{
    await connect
    console.log("Server started")
})
