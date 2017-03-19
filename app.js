var nunjucks = require('nunjucks');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var server = app.listen(80);
// var server = require('http').Server(app);
// var io = require('socket.io')(server);



var io = require('socket.io')(server);

var index = require('./routes/index.js');
var users = require('./routes/users.js');
var chat = require('./routes/chat.js');



//chat
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(__dirname + '/public'));
app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client/dist'));
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use('/', index);
app.use('/users', users);
app.use('/chat', chat);












// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);

});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//set DEBUG=myapp:* & npm start
