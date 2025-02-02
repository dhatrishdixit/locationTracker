const http = require("node:http");
const socketIo = require("socket.io");
const express = require("express");
const path = require("node:path");

const app = express();

app.set("view engine","ejs");
console.log(path.join(__dirname,"public"))
app.use(express.static(path.join(__dirname,"public")));
app.get("/",(req,res)=>{
    res.render("view");
})

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection",(socket)=>{
    socket.on("sendLocation",(data)=>{
        io.emit("receiveLocation",{id:socket.id,...data});
    })

    socket.on("disconnect",()=>{
        io.emit("removeMarker",socket.id);
        console.log("user disconnected");
    })
})

server.listen(3000,() => {
    console.log("listening on *:3000");
})