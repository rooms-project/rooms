const socketio = require("socket.io");

module.exports = server => {

  const io = socketio(server);

  io.on("connection", function(socket) {
    
    
    io.sockets.on('connection', function(socket) {
      socket.on('create', function(room) {
        socket.join(room);
      });
    });
    
    console.log("a user connected");
    socket.on("mensajeria", m => {
      console.log(`NUEVO MENSAJE: ${m}`);
      socket.broadcast.emit("front", m);
    });
  });
};

