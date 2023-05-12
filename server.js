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

// Name of the chat bot
const chatBot = 'Chat bot';
// A map to hold all connected users
const connectedUsers = new Map();
// Array to store the chat log
const chatLog = [];

function emitNotification(message) {
  if (!message) return;
  io.emit('notification', message);
}

function emitConnectedUsers() {
  // Get the list of connected users
  const connectedUsersData = Array.from(connectedUsers.values());

  // Emit the connected users to all connected clients
  io.emit('connected users', connectedUsersData);
}

function emitJoinMessage(username) {
  // Emit a message to all connected clients about the new user joining
  const message = `${username} has joined the chat.`;
  // Send notification to all connected clients
  emitNotification(message);
  // Update the connected users for all clients
  emitConnectedUsers();
}

function emitChatMessage(messageData) {
  // Set the default username as chatBot if it is not provided
  const username = messageData.username || chatBot;

  // Create a new object with the updated username and message
  const updatedMessageData = { ...messageData, username };

  // Emit the chat message to all connected clients
  io.emit('chat message', updatedMessageData);
}

function handleConnection(socket) {
  // Event listener for when someone joins
  socket.on('join', (username) => {
    connectedUsers.set(socket.id, username);

    emitJoinMessage(username);

    // Send the chat log to the newly joined client
    socket.emit('chat log', chatLog);

    // Update the connected users for all clients
    emitConnectedUsers();
  });

  function handleChatMessage(message) {
    // Get the username from connectedUsers
    const username = connectedUsers.get(this.id);

    // Create an object with the username and message
    const messageData = { username, message };

    // Add the message to the chat log
    chatLog.push(messageData);

    // Broadcast the chat message to all connected clients
    emitChatMessage(messageData);
  }

  function handleDisconnect() {
    // Get the username from the socket's data property
    const username = connectedUsers.get(this.id);

    // Remove the disconnected user from the connectedUsers map
    connectedUsers.delete(this.id);

    // Emit a message to all connected clients about the disconnect
    if (username) {
      const disconnectMessage = `${username} has disconnected.`;
      // Emit the chat message to all connected clients
      emitNotification(disconnectMessage);

      // Update the connected users for all clients
      emitConnectedUsers();
    }
  }

  // Event listener for receiving chat messages
  socket.on('chat message', handleChatMessage);

  // Event listener for when someone disconnects
  socket.on('disconnect', handleDisconnect);
}

// Socket.IO event handling
io.on('connection', handleConnection);

// Start the server
const port = 3000;
server.listen(port);
