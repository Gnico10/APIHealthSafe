import io from "socket.io-client";

interface Message {
  sender: string;
  text: string;
}

const socket = io("http://localhost:3000");

const messageList = document.getElementById("message-list");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message: Message = {
    sender: "Me",
    text: messageInput.value,
  };
  socket.emit("message", message);
  messageInput.value = "";
});

socket.on("message", (message: Message) => {
  const listItem = document.createElement("li");
  listItem.innerText = `${message.sender}: ${message.text}`;
  messageList.appendChild(listItem);
});

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("disconnected");
});
