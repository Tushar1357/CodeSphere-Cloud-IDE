const express = require('express')
const router = express.Router()
require('dotenv').config()
const jwt = require('jsonwebtoken')

const secret_key = process.env.SECRET_KEY
router.get('/cookie',(req,res)=>{
  try{
  const cookies = req.cookies
  jwt.verify(cookies.sid,secret_key,(error,result)=>{
    if (error){
      res.send({message: false})
    }
    else{
      res.send({message: true})
    }
  })}
  catch{}
})

module.exports = router