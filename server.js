const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Middlewares
app.use(cors());
app.use(morgan('tiny'));

// Serve static files from the "public" directory
app.use(express.static('public'));

// A map to hold all connected users
const connectedUsers = new Map();

// user handlers
const registerUserHandlers = (socket) => {
  function getUsersInRoom(room) {
    return Array.from(connectedUsers.values())
      .filter((user) => user.room === room)
      .map((user) => user.username);
  }

  const userConnected = (room, username) => {
    const user = { username, room };
    connectedUsers.set(socket.id, user);
  };

  const userJoinRoom = (room) => {
    socket.join(room);
    io.to(room).emit('user:list', getUsersInRoom(room));
  };

  const userNotification = (message) => {
    io.emit('user:notification', message);
  };

  const userMessage = (room, message) => {
    const { username } = connectedUsers.get(socket.id);
    const messageData = { username, message };
    io.to(room).emit('user:message', messageData);
    io.to(room).emit('user:list', getUsersInRoom(room));
  };

  const userList = () => Array.from(connectedUsers.values());

  const userDisconnected = () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      connectedUsers.delete(socket.id);
      io.to(user.room).emit('user:list', getUsersInRoom(user.room));
      io.emit('user:notification', `${user.username} has left the room.`);
    }
  };

  socket.on('user:connected', userConnected);
  socket.on('user:join', userJoinRoom);
  socket.on('user:notification', userNotification);
  socket.on('user:message', userMessage);
  socket.on('user:list', userList);
  socket.on('disconnect', userDisconnected);
};

// Socket.IO event handling
io.on('connection', (socket) => {
  registerUserHandlers(socket);
});

// Start the server
const port = 3000;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
