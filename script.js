const overlay = document.getElementById('overlay');

// Use your backend WebSocket URL here (ws or wss)
const socket = new WebSocket('wss://tiktok-overlay-backend.onrender.com');

socket.addEventListener('open', () => {
  console.log('Connected to TikTok overlay backend');
});

socket.addEventListener('message', (event) => {
  console.log('Raw data received:', event.data);

  const data = JSON.parse(event.data);

  if (data.type === 'chat') {
    console.log('Chat data:', data);
    const el = document.createElement('div');
    el.classList.add('message');
    el.textContent = `${data.uniqueId || 'unknown'}: ${data.comment || '...'}`;
    overlay.appendChild(el);
    setTimeout(() => overlay.removeChild(el), 10000);
  }

  if (data.type === 'gift') {
    console.log('Gift data:', data);
    const el = document.createElement('div');
    el.classList.add('message');
    el.textContent = `${data.uniqueId || 'unknown'} sent a ${data.giftName || 'gift'} x${data.repeatCount || 1}`;
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
