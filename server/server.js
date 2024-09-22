const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});


io.on('connection', (socket) => {
    console.log('New user connected');
  
    socket.on('sendMessage', (message) => {
      io.emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });



const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));