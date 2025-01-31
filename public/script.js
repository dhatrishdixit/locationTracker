const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude} = position.coords;
        socket.emit("sendLocation",{latitude,longitude});
    },
    (err)=>{console.log(err)},
    {
      enableHighAccuracy: true,
      timeout:5000,
      maximumAge:0
    }
    )
} 

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ' <a href="https://github.com/dhatrishdixit">Dhatrish Singh Dixit</a>'
}).addTo(map);

const markers = {} ;

socket.on("receiveLocation",(data)=>{
    const {id,latitude,longitude} = data;
    map.setView([latitude,longitude],13);
    L.marker([latitude,longitude]).addTo(map);
})