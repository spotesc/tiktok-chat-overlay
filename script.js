const overlay = document.getElementById('overlay');

// ✅ Update to use your live backend WebSocket
const socket = new WebSocket('wss://tiktok-overlay-backend.onrender.com');

socket.addEventListener('open', () => {
  console.log('Connected to TikTok overlay backend');
});

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'chat') {
    const el = document.createElement('div');
    el.classList.add('message');
    el.textContent = `${data.uniqueId}: ${data.comment}`;
    overlay.appendChild(el);
    setTimeout(() => overlay.removeChild(el), 10000);
  }

  if (data.type === 'gift') {
    const el = document.createElement('div');
    el.classList.add('message');
    el.textContent = `${data.uniqueId} sent a ${data.giftName} x${data.repeatCount}`;
    overlay.appendChild(el);
    setTimeout(() => overlay.removeChild(el), 12000);
  }
});

socket.addEventListener('close', () => {
  console.warn('WebSocket closed');
});

socket.addEventListener('error', (err) => {
  console.error('WebSocket error:', err);
});
