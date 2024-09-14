const express = require("express");
const Docker = require("dockerode");
const { info } = require("../map");
const path = require("path");
const docker = new Docker();
const router = express.Router();
const fs = require('fs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { add_instance, get_instance } = require("../controllers/instance");
const io = require("../socket.io").getIO();


const secret_key = process.env.SECRET_KEY

const createContainer = async (user_id,name,language) => {
  const dirpath = path.join(__dirname, `../../user_files/${user_id}_${name}`);

  
  const container = await docker.createContainer({
    Image: `custom-${language === "Python"?"python":"nodejs"}-image`,
    Cmd: ["bash"],
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    HostConfig: {
      Binds: [`${dirpath}:/home/${user_id}`],
    },
    WorkingDir: `/home/${user_id}`,
  });
  fs.writeFileSync(`${dirpath}/index.${language === 'Python'?'py':'js'}`,"")
  return container;
};

const getContainer = async (id) => {
  const container = docker.getContainer(id);
  return container;
};

router.post("/create_container", async (req, res) => {
  try {
    const sid = req.cookies.sid
    const details = req.body
    const result = jwt.verify(sid,secret_key)
    const container = await createContainer(result.email,details.name,details.language);
    details['instance_id'] = container.id
    details['email'] = result.email
    if(await add_instance(details))
      res.send(true);
    else
      res.status(400).send("Internal Server Error")
  } catch (err) {
    console.log(err);
    res.status(400).send("Internal Server Error");
  }
});

router.post("/get_container", async (req, res) => {
  try {
    const sid = req.cookies.sid
    const result = jwt.verify(sid,secret_key)
    const instance = await get_instance(result.email)
    if (instance){
      const instance_map = {}
      const instances = JSON.parse(JSON.stringify(instance.instances))
      Object.keys(instances).map(name=>{
        instance_map[name] = instances[name].language
      })
      res.send({status: true,instances: instance_map})
    }
    else{
      res.send({status: false,message: "No instance found"})
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({status: false,message: "Internal Server Error"});
  }
});

router.post("/exec_command", async (req, res) => {
  try {
    const filePath = req.body.path;
    const sid = req.cookies.sid
    const instance_name = req.body.name
    const result = jwt.verify(sid,secret_key)
    if (result){
      const instance = await get_instance(result.email)
      const instances = JSON.parse(JSON.stringify(instance.instances))
      const container_id = instances[instance_name].id
      const language = instances[instance_name].language
      const container = await getContainer(container_id)
      if (container){
        await container.start()
      const output = await container.exec({
        Cmd: [`${language === "Python"?"python3":"node"}`,filePath],
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
      })

      output.start((err,stream)=>{
        if (err){
          res.send(err.toString())
        }
        stream.on('data',data=>{
          io.emit("terminal:output", data.toString());
        })

        stream.on("end", async () => {
          await container.kill();
          res.send("Command executed");
        });
      })
      }
      else{
        res.send("No container created yet")
      }
      
    }
    else{
      res.send("Invalid User")
    }
    
  } catch (err) {
    console.log("error", err);
  }
});

module.exports = router;
