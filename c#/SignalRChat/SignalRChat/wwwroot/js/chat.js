"use strict";

const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
const messagesList = document.getElementById("messagesList");
const userInput = document.getElementById("userInput");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const emojiButton = document.getElementById("emojiButton");
const emojiPicker = document.getElementById("emojiPicker");
const notificationSound = document.getElementById("notificationSound");

sendButton.disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    const currentUser = userInput.value.trim();
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", user === currentUser ? "sent" : "received");

    if (user !== currentUser) {
        notificationSound.play();
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const ticks = user === currentUser ? '<i class="fa fa-check-double text-primary ms-2"></i>' : '';

    messageDiv.innerHTML = `
        <div class="username">${escapeHtml(user)}</div>
        ${escapeHtml(message)}
        <div class="timestamp">${timestamp} ${ticks}</div>
    `;

    messagesList.appendChild(messageDiv);
    messagesList.scrollTop = messagesList.scrollHeight;
});

connection.start().then(() => {
    sendButton.disabled = false;
}).catch(err => console.error(err.toString()));

sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const user = userInput.value.trim();
    const message = messageInput.value.trim();

    if (!user) {
        alert("Please enter your name");
        return;
    }

    if (!message) {
        alert("Please enter a message");
        return;
    }

    connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
    messageInput.value = "";
}

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m];
    });
}

emojiButton.addEventListener("click", () => {
    emojiPicker.style.display = emojiPicker.style.display === "none" ? "block" : "none";
});

emojiPicker.addEventListener("emoji-click", event => {
    messageInput.value += event.detail.unicode;
});
