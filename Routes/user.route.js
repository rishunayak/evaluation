const express=require("express");
const User = require("../Model/user.model");
const bcrypt = require('bcrypt');
const app=express.Router()
const jwt = require('jsonwebtoken');


app.post("/register",async(req,res)=>
{
    const {name,email,gender,password}=req.body; 

    try 
    {
        const exist=await User.findOne({email:email})

        if(exist)
        {
            res.send("User Alredy Registered")
        }
        else
        {
            
                bcrypt.hash(password, 5, async(err, hashPassword)=> {
                    
                    if(err)
                    {
                        res.send(err)
                    }
                    else
                    {
                        try
                        {
                            await User.create({name,email,gender,password})
                            res.send({msg:"Successfully Registered"})
                        }
                        catch(e)
                        {
                           res.send(e)
                        }
                    }
                });
               
              
            
        }
    }
    catch(e)
    {
        res.send(e)
    }
})



app.post("/login",async(req,res)=>
{
    const {email,password}=req.body

    try
    {
        const exist=await User.findOne({email:email})
        
        if(exist)
        {
            bcrypt.compare(password, exist.password, function(err, result) {
                if(err)
                {
                    res.send("Wrong Credntials")
                }
                else{
                    const token=jwt.sign({ id: exist._id }, 'auth');
                    res.send({token:token})
                }
            });
        }
        else
        {
            res.send("Email Doesn't Exist")
        }
    }
    catch(e)
    {
        res.send(e);
    }
})

module.exports=app