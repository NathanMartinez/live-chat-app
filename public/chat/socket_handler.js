// eslint-disable-next-line no-undef
const socket = io();
const chatForm = document.querySelector('.input-group');
const messageInput = document.querySelector('input');
const chatMessages = document.querySelector('.chat-messages');
const userList = document.querySelector('.user-list');
const notificationContainer = document.querySelector('.notification-container');

function getUsernameWithFallback() {
  const storedUsername = sessionStorage.getItem('username');

  // Check if a username is stored in session storage
  if (storedUsername) {
    return storedUsername;
  }
  // Generate a fallback username using a random number
  const fallbackUsername = `User${Math.floor(Math.random() * 10000)}`;

  // Store the fallback username in session storage for future use
  sessionStorage.setItem('username', fallbackUsername);

  return fallbackUsername;
}

function getRoomFromSession() {
  const storedRoom = sessionStorage.getItem('room');

  if (storedRoom) {
    return storedRoom;
  }

  const defaultRoom = 'general';

  sessionStorage.setItem('room', defaultRoom);

  return defaultRoom;
}

function addMessage({ message, username = 'Chat Bot' }) {
  if (!message) return;

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');

  const usernameSpan = document.createElement('span');
  usernameSpan.classList.add('username');
  usernameSpan.innerText = `${username}: `;

  const messageSpan = document.createElement('span');
  messageSpan.classList.add('text');
  messageSpan.innerText = message;

  messageDiv.appendChild(usernameSpan);
  messageDiv.appendChild(messageSpan);

  chatMessages.appendChild(messageDiv);
}

function onLoad() {
  const username = getUsernameWithFallback();
  const room = getRoomFromSession();
  const message = `Welcome to ${room}, ${username}!`;
  addMessage({ message });
}

function handleSubmit(event) {
  event.preventDefault();
  const message = messageInput.value;
  const room = getRoomFromSession(); // Get the room from session storage
  socket.emit('user:message', room, message); // Pass the room along with the message
  messageInput.value = '';
}

function addUser(username) {
  const userItem = document.createElement('li');
  userItem.classList.add('list-group-item');
  userItem.innerText = username;
  userList.appendChild(userItem);
}

function showNotification(message) {
  const toastElement = document.createElement('div');
  toastElement.classList.add('toast', 'show', 'bg-dark', 'text-light');
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

function updateConnectedUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    addUser(user);
  });
}

document.addEventListener('DOMContentLoaded', onLoad);

chatForm.addEventListener('submit', handleSubmit);

socket.on('connect', () => {
  const username = getUsernameWithFallback();
  const room = getRoomFromSession();
  socket.emit('user:connected', room, username);
  socket.emit('user:join', room);
});

socket.on('user:notification', showNotification);

socket.on('user:message', (messageData) => {
  addMessage(messageData);
});

socket.on('user:list', (users) => {
  updateConnectedUsers(users);
});

socket.on('disconnect', () => {
  showNotification('Disconnected from the server.');
});

socket.on('connect_error', () => {
  showNotification('Failed to connect to the server.');
});
