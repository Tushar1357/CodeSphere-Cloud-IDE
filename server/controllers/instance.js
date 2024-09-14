const mongoose = require('mongoose')

const schema = mongoose.Schema({
  email: {type:String,required: true,unique: true},
  instances: {type: Map},
  date: {type: Date, default: Date.now}
})

const instance_model = mongoose.model('instance',schema,'Instance')

const get_instance = async (email)=>{
  const instance = await instance_model.findOne({email :email})
  if (instance){
    return instance;
  }
  return false;
}

const add_instance = async (details)=>{
  const instance = await get_instance(details.email)
  if (!instance){
      const data = {}
      data[details.name] = {}
      data[details.name]['language'] = details.language
      data[details.name]['id'] = details.instance_id
      const new_instance = new instance_model({
        email: details.email,
        instances: data
      })
      await new_instance.save()
      return true
  }
  else{
    const data = {}
    data['language'] = details.language
    data['id'] = details.instance_id
    instance.instances.set(details.name,data)
    await instance.save()
    return true
  }  
}



module.exports = {get_instance,add_instance}