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

function addMessage({ message, username }) {
  if (!message || !username) return;

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
  const chatBot = 'Chat Bot';
  const username = getUsernameWithFallback();
  const message = `Welcome to the room, ${username}!`;
  addMessage({ username: chatBot, message });
}

function handleSubmit(event) {
  event.preventDefault();
  const message = messageInput.value;
  socket.emit('chat message', message);
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

document.addEventListener('DOMContentLoaded', onLoad);

chatForm.addEventListener('submit', handleSubmit);

socket.on('connect', () => {
  const username = getUsernameWithFallback();
  socket.emit('join', username);
});

socket.on('chat log', (chatLog) => {
  chatLog.forEach((messageData) => {
    addMessage(messageData);
  });
});

function updateConnectedUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    addUser(user);
  });
}

socket.on('disconnect', showNotification);

socket.on('chat message', addMessage);

socket.on('connected users', updateConnectedUsers);

socket.on('notification', showNotification);
