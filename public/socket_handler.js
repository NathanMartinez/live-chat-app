import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

const socket = io();
const chat_form = document.querySelector('.input-group');
const message_input = document.querySelector('input');
const chat_messages = document.querySelector('.chat-messages');
const user_list = document.querySelector('.user-list');
const notificationContainer = document.querySelector('.notification-container');

function on_load() {
    const chat_bot = 'Chat Bot';
    const username = get_username_with_fallback();
    const message = `Welcome to the room, ${username}!`;
    add_message({ username: chat_bot, message });
}

function get_username_with_fallback() {
	const storedUsername = sessionStorage.getItem('username');

	// Check if a username is stored in session storage
	if (storedUsername) {
		return storedUsername;
	} else {
		// Generate a fallback username using a random number
		const fallbackUsername = 'User' + Math.floor(Math.random() * 10000);

		// Store the fallback username in session storage for future use
		sessionStorage.setItem('username', fallbackUsername);

		return fallbackUsername;
	}
}

function handle_submit(event) {
	event.preventDefault();
	const message = message_input.value;
	socket.emit('chat message', message);
	message_input.value = '';
}

function add_message({ message, username }) {
	if (!message || !username) return;

	const message_div = document.createElement('div');
	message_div.classList.add('message');

	const username_span = document.createElement('span');
	username_span.classList.add('username');
	username_span.innerText = `${username}: `;

	const message_span = document.createElement('span');
	message_span.classList.add('text');
	message_span.innerText = message;

	message_div.appendChild(username_span);
	message_div.appendChild(message_span);

	chat_messages.appendChild(message_div);
}

function add_user(username) {
	const user_item = document.createElement('li');
	user_item.classList.add('list-group-item'); 
	user_item.innerText = username;
	user_list.appendChild(user_item);
}


function show_notification(message) {
	const toastElement = document.createElement('div');
	toastElement.classList.add('toast', 'show', 'bg-dark', 'text-light'); // Added 'bg-dark' and 'text-light' classes for dark background and light-colored text
	toastElement.setAttribute('role', 'alert');
	toastElement.setAttribute('aria-live', 'assertive');
	toastElement.setAttribute('aria-atomic', 'true');

	const toastBody = document.createElement('div');
	toastBody.classList.add('toast-body');
	toastBody.innerText = message;

	toastElement.appendChild(toastBody);
	notificationContainer.appendChild(toastElement);

	// Remove the toast after a short delay
	setTimeout(() => {
		toastElement.remove();
	}, 3000);
}

document.addEventListener('DOMContentLoaded', on_load);

chat_form.addEventListener('submit', handle_submit);

socket.on('connect', () => {
	const username = get_username_with_fallback();
	socket.emit('join', username);
});

socket.on('chat log', (chat_log) => {
	chat_log.forEach((messageData) => {
		add_message(messageData);
	});
});

socket.on('disconnect', show_notification);

socket.on('chat message', add_message);

socket.on('connected users', update_connected_users);

socket.on('notification', show_notification);

function update_connected_users(users) {
	user_list.innerHTML = '';
	users.forEach((user) => {
		add_user(user);
	});
}
