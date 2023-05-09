const form = document.querySelector('form');
const usernameInput = document.querySelector('input');

function join_chat(event) {
	event.preventDefault();
	const username = usernameInput.value;
	if (!username) return;
	// Save username in session storage
	sessionStorage.setItem('username', username);
	// Redirect to the /chat endpoint
	window.location.href = '/chat.html';
}

form.addEventListener('submit', join_chat);
