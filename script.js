// IMPORTANT: use your Render backend WS URL
const socket = new WebSocket("wss://tiktok-overlay-backend.onrender.com");

socket.onopen = () => {
  console.log("Connected to backend WebSocket");
};

socket.onerror = (err) => {
  console.error("WebSocket error:", err);
};

socket.onclose = () => {
  console.warn("WebSocket closed");
};

function disappear(el, ms = 8000) {
  setTimeout(() => {
    el.style.animation = "fadeOutUp 0.7s forwards";
    el.addEventListener("animationend", () => el.remove());
  }, ms);
}

function renderBadges(badges = []) {
  const wrap = document.createElement("span");
  wrap.className = "badges";
  badges.forEach(b => {
    const span = document.createElement("span");
    span.className = `badge badge-${b}`;
    span.title = b;
    wrap.appendChild(span);
  });
  return wrap;
}

socket.onmessage = (event) => {
  let data;
  try {
    data = JSON.parse(event.data);
  } catch (e) {
    console.error("Invalid JSON:", event.data);
    return;
  }

  const container = document.getElementById("chat-container");
  if (!container) return;

  if (data.type === "chat") {
    const msg = document.createElement("div");
    msg.className = "chat-message";

    const badgesEl = renderBadges(data.badges || []);

    const user = document.createElement("span");
    user.className = "username";
    user.textContent = data.user || data.nickname || "Unknown";

    const comment = document.createElement("span");
    comment.className = "comment";
    comment.textContent = ` ${data.comment}`;

    msg.appendChild(badgesEl);
    msg.appendChild(user);
    msg.appendChild(comment);

    container.appendChild(msg);
    disappear(msg, 9000);
  }

  if (data.type === "gift") {
    const gift = document.createElement("div");
    gift.className = "gift-message";
    gift.textContent = `${data.user || data.nickname} sent ${data.repeatCount || data.giftCount || 1} × ${data.gift || data.giftName}`;
    container.appendChild(gift);
    disappear(gift, 10000);
  }
};
