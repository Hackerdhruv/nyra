function showTyping() {
  const typing = document.createElement("div");
  typing.id = "typing";
  typing.className = "typing";
  typing.innerText = "Vibely is typing...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

sendBtn.onclick = async () => {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  showTyping(); // ✅ typing ON

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: text,
      name: userName
    })
  });

  const data = await res.json();

  hideTyping(); // ✅ typing OFF
  addMessage(data.reply, "bot");
};
