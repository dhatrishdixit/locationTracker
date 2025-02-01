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

const map = L.map('map').setView([0, 0], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ' <a href="https://github.com/dhatrishdixit">Dhatrish Singh Dixit</a>'
}).addTo(map);

const markers = {} ;

socket.on("receiveLocation",(data)=>{
    const {id,latitude,longitude} = data;
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
        console.log("marker updated");
    }
    else{
        markers[id] = L.marker([latitude,longitude]);
        markers[id].addTo(map); 
        map.setView([latitude,longitude],13);
    }
   
})

socket.on("removeMarker",(data)=>{
    map.removeLayer(markers[data]);
    delete markers[data];
})