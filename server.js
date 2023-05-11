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
const chat_bot = 'Chat bot';
// A map to hold all connected users
const connected_users = new Map();
// Array to store the chat log
const chat_log = []; 

// Socket.IO event handling
io.on('connection', handle_connection);

function handle_connection(socket) {
	// Event listener for when someone joins
	socket.on('join', (username) => {
		socket.data.username = username;
		connected_users.set(socket.id, username);

		emit_join_message(username);

		// Send the chat log to the newly joined client
		socket.emit('chat log', chat_log);

		// Update the connected users for all clients
		emit_connected_users();
	});

	// Event listener for receiving chat messages
	socket.on('chat message', handle_chat_message);

	// Event listener for when someone disconnects
	socket.on('disconnect', handle_disconnect);
}

function handle_chat_message(message) {
	// Get the username from connected_users
	const username = connected_users.get(this.id);

	// Create an object with the username and message
	const message_data = { username, message };

	// Add the message to the chat log
	chat_log.push(message_data);

	// Broadcast the chat message to all connected clients
	emit_chat_message(message_data);
}

function handle_disconnect() {
	// Get the username from the socket's data property
	const username = connected_users.get(this.id);

	// Remove the disconnected user from the connected_users map
	connected_users.delete(this.id);

	// Emit a message to all connected clients about the disconnect
	if (username) {
		const disconnectMessage = `${username} has disconnected.`;
		// Emit the chat message to all connected clients
		emit_notification(disconnectMessage);

		// Update the connected users for all clients
		emit_connected_users();
	}
}

function emit_join_message(username) {
	// Emit a message to all connected clients about the new user joining
	const message = `${username} has joined the chat.`;
	// Send notification to all connected clients
	emit_notification(message);
	// Update the connected users for all clients
	emit_connected_users();
}

function emit_chat_message(message_data) {
	// Set the default username as chat_bot if it is not provided
	const username = message_data.username || chat_bot;

	// Create a new object with the updated username and message
	const updated_message_data = { ...message_data, username };

	// Emit the chat message to all connected clients
	io.emit('chat message', updated_message_data);
}

function emit_connected_users() {
	// Get the list of connected users
	const connected_users_data = Array.from(connected_users.values());

	// Emit the connected users to all connected clients
	io.emit('connected users', connected_users_data);
}

function emit_notification(message) {
	if (!message) return;
	io.emit('notification', message)
}

// Start the server
const port = 3000;
server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
