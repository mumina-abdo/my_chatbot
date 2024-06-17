const chatInput = document.querySelector(".chat-input textarea");
const sendBtn = document.querySelector("#send-btn");
const chatbox = document.querySelector(".chatbox");

sendBtn.addEventListener("click", () => {
  let userInput = chatInput.value;
  if (userInput.trim() != "") {
    generateChat("outgoing", userInput);
    chatInput.value = "";
    getBotResponse(userInput);
  }
});

chatInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && userInput.trim() != "") {
    generateChat("outgoing", userInput);
    chatInput.value = "";
    getBotResponse(userInput);
  }
});

function generateChat(type, text) {
  let chatElement = `
    <li class="chat ${type}">
      <div class="chat-content">
        <p>${text}</p>
      </div>
    </li>
  `;
  chatbox.innerHTML += chatElement;
  scrollToBottom();
}

function getBotResponse(userInput) {
  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY_HERE"
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: userInput,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.5
    })
  })
  .then(response => response.json())
  .then(data => {
    let botResponse = data.choices[0].text.trim();
    generateChat("incoming", botResponse);
  })
  .catch(error => {
    console.error("Error:", error);
    generateChat("incoming", "Oops! Something went wrong. Please try again later.");
  });
}

function scrollToBottom() {
  chatbox.scrollTop = chatbox.scrollHeight;
}