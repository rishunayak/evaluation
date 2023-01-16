const express=require("express")
const authentication = require("../middleware/authentication")
const Post = require("../Model/post.model")


const app=express.Router()

app.use(authentication)


app.get("/",async(req,res)=>
{
 try
 {
    const getData=await Post.find({id:req.body.id})
    res.send(getData)
 }
 catch(err)
 {
    res.send(err)
 }

})



app.get("/:id",async(req,res)=>
{
    const id=req.params.id
 try
 {
    const getData=await Post.findOne({_id:id})
    res.send(getData)
 }
 catch(err)
 {
    res.send(err)
 }

})

app.post("/addPost",async(req,res)=>
{
    try
    {
        await Post.create(req.body)
        res.send({msg:"Posted Successfully"})
    }
    catch(e)
    {
        res.send(E)
    }
})


app.patch("/update/:id",async(req,res)=>
{
    const id=req.params.id

    try
    {
        const data=await Post.findOneAndUpdate({_id:id},req.body)
        res.send({msg:"Updated Successfully"})
    }
    catch
    {
        res.send(err);
    }
})

app.delete("/delete/:id",async(req,res)=>
{
    const id=req.params.id

    try
    {
        const data=await Post.findOneAndDelete({_id:id})
        res.send({msg:"Deleted Successfully"})
    }
    catch
    {
        res.send(err);
    }

})

module.exports=app