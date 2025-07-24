// Connect to backend WebSocket server (update URL to your backend)
const socket = new WebSocket('wss://tiktok-overlay-backend.onrender.com');

socket.addEventListener('open', () => {
  console.log('Connected to backend WebSocket');
});

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'chat') {
    showChatMessage(data.user, data.message);
  }
});

function showChatMessage(user, message) {
  const chatContainer = document.getElementById('chat-container');

  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message';
  messageDiv.textContent = `${user}: ${message}`;

  chatContainer.appendChild(messageDiv);

  // Animate and remove after 5 seconds
  messageDiv.style.opacity = '1';
  setTimeout(() => {
    messageDiv.style.opacity = '0';
    setTimeout(() => chatContainer.removeChild(messageDiv), 500);
  }, 5000);
}
