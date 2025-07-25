const socket = new WebSocket("wss://tiktok-overlay-backend.onrender.com");

const messagesContainer = document.getElementById("messages");

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  let messageText = "";

  if (data.type === "chat") {
    messageText = `${data.username}: ${data.comment}`;
  } else if (data.type === "gift") {
    messageText = `${data.username} sent ${data.giftAmount}x ${data.giftName}`;
  } else {
    return; // ignore unknown types
  }

  const li = document.createElement("li");
  li.textContent = messageText;

  messagesContainer.appendChild(li);

  // Auto-scroll
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Remove message after 15 seconds
  setTimeout(() => {
    li.remove();
  }, 15000);
});
