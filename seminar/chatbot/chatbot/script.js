const form = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content.trim();
        appendMessage("bot", botReply);

    } catch (error) {
        appendMessage("bot", "Oops! Something went wrong.");
    }
});

function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}
