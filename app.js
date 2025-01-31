const http = require("node:http");
const socketIo = require("socket.io");
const express = require("express");
const path = require("node:path");

app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")));
app.get("/",(req,res)=>{
    res.end("hello");
})

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection",(socket)=>{
    console.log("a user connected");
})

server.listen(3000,() => {
    console.log("listening on *:3000");
})