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
const chat_log = [];

// Socket.IO event handling
io.on('connection', (socket) => {
	registerUserHandlers(io, socket);
});

function registerUserHandlers(io, socket) {
	function addUser(username) {
		
	}
	socket.on("user:add", addUser)
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
