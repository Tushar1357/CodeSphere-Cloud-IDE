const mongoose = require('mongoose')

const schema = mongoose.Schema({
    password: {type: String,required: true},
    email: {type: String, required:true,unique:true},
    date: {type: Date,default: Date.now}
})

const users_model = mongoose.model('login-users',schema,'user_details')

const find_user = async (info)=>{
    const user = await users_model.findOne({email:info.email})
    try{
        if (user){
           return user
        }
        return false
    }
    catch{
    }
    
}


module.exports = {find_user}