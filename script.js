const overlay = document.getElementById('overlay');
const socket = new WebSocket('wss://tiktok-overlay-backend.onrender.com');

socket.addEventListener('open', () => {
  console.log('Connected to TikTok overlay backend');
});

function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function createChatMessage(data) {
  const container = document.createElement('div');
  container.classList.add('chat-message');

  // Optional avatar if backend sends profilePictureUrl
  if (data.profilePictureUrl) {
    const avatar = document.createElement('img');
    avatar.src = data.profilePictureUrl;
    avatar.alt = data.uniqueId;
    avatar.classList.add('avatar');
    container.appendChild(avatar);
  }

  const messageBody = document.createElement('div');
  messageBody.classList.add('message-body');

  const userName = document.createElement('span');
  userName.classList.add('user-name');
  userName.innerHTML = sanitize(data.uniqueId) + ': ';

  const comment = document.createElement('span');
  comment.classList.add('comment');
  comment.innerHTML = sanitize(data.comment);

  messageBody.appendChild(userName);
  messageBody.appendChild(comment);
  container.appendChild(messageBody);

  return container;
}

function createGiftMessage(data) {
  const el = document.createElement('div');
  el.classList.add('gift-message');
  el.textContent = `${data.uniqueId} sent a ${data.giftName} x${data.repeatCount}`;
  return el;
}

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);

  let el;
  if (data.type === 'chat') {
    el = createChatMessage(data);
  } else if (data.type === 'gift') {
    el = createGiftMessage(data);
  }

  if (el) {
    overlay.appendChild(el);
    setTimeout(() => {
      el.classList.add('fade-out');
      el.addEventListener('transitionend', () => el.remove());
    }, 10000);
  }
});

socket.addEventListener('close', () => console.warn('WebSocket closed'));
socket.addEventListener('error', (err) => console.error('WebSocket error:', err));
