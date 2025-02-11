const socket = new WebSocket("wss://" + window.location.host);

socket.onmessage = async (event) => {
    const text = await event.data.text(); // Convert Blob to text
    const chatBox = document.getElementById("chat-box");
    const message = document.createElement("p");
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
};


function sendMessage() {
    const input = document.getElementById("message-input");
    if (input.value) {
        socket.send(input.value);
        input.value = ""; // Clear input field
    }
}
