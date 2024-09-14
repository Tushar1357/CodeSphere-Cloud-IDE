const express = require('express')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')
const {add_user} = require('../controllers/signup')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const routers = express.Router()
const secret_key = process.env.SECRET_KEY




routers.post('/register',(req,res)=>{
    const details = req.body
    bcrypt.hash(details.password,10, (err,result)=>{
        if(err){
            res.status(500).send('An error occurred')
        }
        else if(result){
            details.password = result
            add_user(details).then(result=>{
                if (result){
                    const token = jwt.sign({email: details.email},secret_key,{expiresIn: 60*60*24*30})
                    res.cookie('sid',token,{maxAge: 30*24*60*60*1000,httpOnly: false,secure: true,sameSite: 'None'})
                    res.send({status: true})
                }
                else{
                    res.send({status: false, message:"User already registered"})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})

module.exports = routers