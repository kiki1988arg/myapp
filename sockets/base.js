module.exports = function (io) { 

var messages = [{
  author: "Carlos",
  text: "Hola! que tal?"
}, {
  author: "Pepe",
  text: "Muy bien! y tu??"
}, {
  author: "Paco",
  text: "Genial!"
}];

io.on('connection', function (socket) {
  console.log('Un cliente se ha conectado');
  socket.emit('messages', messages);
  
  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});
}