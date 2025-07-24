const socket = new WebSocket("ws://localhost:8080");

function removeMessage(msgDiv) {
  msgDiv.style.animation = "fadeOutUp 0.7s forwards";
  msgDiv.addEventListener("animationend", () => msgDiv.remove());
}

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const container = document.getElementById("chat-container");

  if (data.type === "chat") {
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-message";

    const badges = document.createElement("span");
    badges.className = "badges";
    (data.badges || []).forEach(b => {
      const badge = document.createElement("span");
      badge.className = `badge badge-${b}`;
      badge.title = b;
      badges.appendChild(badge);
    });

    const username = document.createElement("span");
    username.className = "username";
    username.textContent = data.nickname;

    const comment = document.createElement("span");
    comment.className = "comment";
    comment.textContent = ` ${data.comment}`;

    msgDiv.appendChild(badges);
    msgDiv.appendChild(username);
    msgDiv.appendChild(comment);

    container.appendChild(msgDiv);

    setTimeout(() => removeMessage(msgDiv), 9000);
  }

  if (data.type === "gift") {
    const gift = document.createElement("div");
    gift.className = "gift-message";
    gift.textContent = `${data.nickname} sent ${data.giftCount} × ${data.giftName}`;
    container.appendChild(gift);
    setTimeout(() => removeMessage(gift), 10000);
  }
};
