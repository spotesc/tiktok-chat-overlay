const socket = new WebSocket('ws://localhost:10000'); // update to your deployed WebSocket URL if needed

socket.addEventListener('message', function (event) {
  const data = JSON.parse(event.data);
  const overlay = document.getElementById('overlay');

  if (data.type === 'chat') {
    const username = data.username?.trim() || 'User';
    const message = data.message?.trim() || '';

    if (!message) return; // don't render empty comments

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';

    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'username';
    nameSpan.textContent = username;

    const msgSpan = document.createElement('span');
    msgSpan.className = 'comment';
    msgSpan.textContent = message;

    userInfo.appendChild(nameSpan);
    userInfo.appendChild(msgSpan);
    messageDiv.appendChild(userInfo);
    overlay.appendChild(messageDiv);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 10000);
  }
});
