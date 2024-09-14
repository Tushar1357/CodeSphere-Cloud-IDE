const express = require("express");
const httpServer = require("http");
const { Server } = require("socket.io");
const fs = require("fs").promises;
const cors = require("cors");
const cp = require("cookie-parser");
const port = process.env.PORT || 3000;
const file_route = require("./routes/files");
const login_route = require("./routes/login");
const signup_route = require("./routes/signup");
const validate_router = require("./routes/validate");
const app = express();
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret_key = process.env.SECRET_KEY

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const server = httpServer.createServer(app);

const io = require("./socket.io").init(server);
const container_route = require("./routes/container");



io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("file:write", async (data) => {
    const custom_path = data.path;
    const code = data.code;
    const token = data.token
    const instance_name = data.name
    const result = jwt.verify(token.sid,secret_key)
    if (result){
      await fs.writeFile(`../user_files/${result.email}_${instance_name}/${custom_path}`, code);
    }

  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cp());
app.use("/", container_route);
app.use("/files", file_route);
app.use("/signup", signup_route);
app.use("/login", login_route);
app.use("/validate", validate_router);

server.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
