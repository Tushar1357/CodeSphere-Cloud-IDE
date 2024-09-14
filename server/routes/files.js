const { dir } = require("console");
const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const router = express.Router();
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret_key = process.env.SECRET_KEY


const get_file_tree = async (dirPath) => {
  try {
    const data = await fs.readdir(dirPath, { withFileTypes: true });
    const tree = {};
    for (const docs of data) {
      if (docs.isDirectory()) {
        const custom_path = path.join(dirPath, docs.name);
        tree[docs.name] = await get_file_tree(custom_path);
      } else {
        tree[docs.name] = null;
      }
    }
    return tree;
  } catch (err) {
    console.log("There is an error:", err);
    return null;
  }
};

router.post("/get_files", async (req, res) => {
  const instance_name = req.body.name
  const sid = req.cookies.sid
  const result = jwt.verify(sid,secret_key)
  const user_id = result.email;
  const dirPath = path.join(__dirname, `../../user_files/${user_id}_${instance_name}`);

  const data = await get_file_tree(dirPath);
  if (data) {
    res.json(data);
  } else {
    console.log("No data found.");
    res.status(400).send("Error found while retreiving files");
  }
});
router.post("/get_file_content", async (req, res) => {
  try {
    const file_path = req.body.file_path;
    const instance_name = req.body.name
    const sid = req.cookies.sid
    const result = jwt.verify(sid,secret_key)
    const user_id = result.email
    const dirPath = path.join(
      __dirname,
      `../../user_files/${user_id}_${instance_name}/${file_path}`
    );
    const file_content = await fs.readFile(dirPath, "utf-8");
    res.send(file_content);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;