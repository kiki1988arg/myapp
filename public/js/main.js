var socket = io.connect('http://localhost:3000');

socket.on('messages', function(data) {  
    console.log(data);
});