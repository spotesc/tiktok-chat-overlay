const chatContainer = document.getElementById('chat-container');

// Connect to your backend WebSocket (adjust URL if needed)
const socket = new WebSocket('wss:/https://tiktok-overlay-backend.onrender.com');

socket.addEventListener('open', () => {
  console.log('Connected to backend WebSocket');
});

socket.addEventListener('message', (event) => {
  try {
    const data = JSON.parse(event.data);

    if (data.type === 'chat') {
      addChatMessage(data.username, data.message);
    }
  } catch (e) {
    console.error('Invalid message', e);
  }
});

function addChatMessage(username, message) {
  const messageEl = document.createElement('div');
  messageEl.classList.add('chat-message');

  const userEl = document.createElement('span');
  userEl.classList.add('username');
  userEl.textContent = username + ':';

  const textEl = document.createElement('span');
  textEl.classList.add('message');
  textEl.textContent = message;

  messageEl.appendChild(userEl);
  messageEl.appendChild(textEl);
  chatContainer.prepend(messageEl);

  // Remove message after 10 seconds with fade-out animation
  setTimeout(() => {
    messageEl.classList.add('hide');
    setTimeout(() => {
      chatContainer.removeChild(messageEl);
    }, 500);
  }, 10000);
}
