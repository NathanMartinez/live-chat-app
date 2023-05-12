const form = document.querySelector('form');
const usernameInput = document.querySelector('input');

function joinChat(event) {
  event.preventDefault();
  const username = usernameInput.value;
  if (!username) return;
  // Save username in session storage
  sessionStorage.setItem('username', username);
  // Redirect to the /chat endpoint
  window.location.href = '/chat';
}

form.addEventListener('submit', joinChat);
