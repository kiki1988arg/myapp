var socket = io.connect();

socket.on('messages', function(data) {  
    console.log(data);
});