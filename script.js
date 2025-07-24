// script.js

// Replace this with your Render backend websocket URL
const WEBSOCKET_URL = 'wss://tiktok-overlay-backend.onrender.com';

// Connect to the backend WebSocket
const socket = new WebSocket(WEBSOCKET_URL);

// Get reference to chat container in your HTML
const chatContainer = document.getElementById('chat');

// Maximum messages to display at once
const MAX_MESSAGES = 5;

// Duration each message stays visible (ms)
const MESSAGE_DURATION = 8000;

socket.addEventListener('open', () => {
  console.log('Connected to backend websocket');
});

socket.addEventListener('message', (event) => {
  try {
    const data = JSON.parse(event.data);

    if (data.type === 'chat') {
      showChatMessage(data.username, data.message);
    }

    // You can add other data.type handlers here (e.g. gifts, reactions)
  } catch (e) {
    console.error('Failed to parse message:', e);
  }
});

function showChatMessage(username, message) {
  // Create message wrapper div
  const messageEl = document.createElement('div');
  messageEl.classList.add('chat-message');
  
  // Modern styling: username bold + message, with some spacing
  messageEl.innerHTML = `<span class="chat-username">${sanitize(username)}:</span> <span class="chat-text">${parseEmojis(sanitize(message))}</span>`;

  // Append to chat container
  chatContainer.appendChild(messageEl);

  // Animate in (fade + slide up)
  requestAnimationFrame(() => {
    messageEl.classList.add('visible');
  });

  // Remove oldest messages if exceeding max
  while (chatContainer.children.length > MAX_MESSAGES) {
    chatContainer.removeChild(chatContainer.firstChild);
  }

  // Remove message after duration with fade out
  setTimeout(() => {
    messageEl.classList.remove('visible');
    messageEl.addEventListener('transitionend', () => {
      messageEl.remove();
    });
  }, MESSAGE_DURATION);
}

// Basic sanitize to avoid HTML injection
function sanitize(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

// Simple emoji parser: converts :) and :D to emoji chars as example
function parseEmojis(text) {
  return text
    .replace(/:\)/g, '😊')
    .replace(/:D/g, '😄')
    .replace(/:\(/g, '😞')
    // Add more emoji shortcuts here
    ;
}
