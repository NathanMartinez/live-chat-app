const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const roomInput = document.querySelector('#room');

function joinChat(event) {
  event.preventDefault();
  const username = usernameInput.value;
  const room = roomInput.value;
  if (!username) return;
  // Save username in session storage
  sessionStorage.setItem('username', username);
  // Save room in session storage
  sessionStorage.setItem('room', room);
  // Redirect to the /chat endpoint
  window.location.href = '/chat';
}

form.addEventListener('submit', joinChat);
