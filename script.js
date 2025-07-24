// Replace this with your backend WebSocket URL (use wss:// if HTTPS)
const ws = new WebSocket('wss://tiktok-overlay-backend.onrender.com');

ws.onopen = () => {
  console.log('Connected to backend websocket');
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (message.type === 'chat') {
    const { username, comment } = message.data;
    showChatMessage(username, comment);
  } else if (message.type === 'gift') {
    const { username, giftName } = message.data;
    showGiftMessage(username, giftName);
  }
};

ws.onerror = (err) => {
  console.error('WebSocket error:', err);
};

function showChatMessage(username, comment) {
  const chatBox = document.getElementById('chat');
  const el = document.createElement('div');
  el.className = 'chat-message';
  el.innerHTML = `<strong>${escapeHtml(username)}:</strong> ${parseEmojis(escapeHtml(comment))}`;
  chatBox.prepend(el);
  animateAndRemove(el);
}

function showGiftMessage(username, giftName) {
  const chatBox = document.getElementById('chat');
  const el = document.createElement('div');
  el.className = 'gift-message';
  el.innerHTML = `🎁 <strong>${escapeHtml(username)}</strong> sent a <em>${escapeHtml(giftName)}</em>`;
  chatBox.prepend(el);
  animateAndRemove(el);
}

function animateAndRemove(element) {
  // Trigger showing animation
  requestAnimationFrame(() => {
    element.classList.add('show');
  });

  // Remove after 8 seconds with fade out
  setTimeout(() => {
    element.classList.remove('show');
    setTimeout(() => {
      element.remove();
    }, 500);
  }, 8000);
}

// Basic emoji parser (expand as needed or use an emoji library)
function parseEmojis(text) {
  return text
    .replace(/:\)/g, '😊')
    .replace(/:\(/g, '☹️')
    .replace(/:heart:/g, '❤️')
    .replace(/:rose:/g, '🌹');
}

// Simple escape to pr
