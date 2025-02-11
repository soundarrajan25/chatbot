const socket = new WebSocket("wss://" + window.location.host);

socket.onmessage = async (event) => {
    const text = await event.data.text(); // Convert Blob to text
    const chatBox = document.getElementById("chat-box");

    // Create a new message element
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("person-b"); // Assuming incoming messages are from person-b

    const messageContent = document.createElement("div");
    messageContent.classList.add("message");
    messageContent.textContent = text;

    messageDiv.appendChild(messageContent);
    chatBox.appendChild(messageDiv);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
};

function sendMessage() {
    const input = document.getElementById("message-input");
    if (input.value) {
        const chatBox = document.getElementById("chat-box");

        // Create a new message element for the sender (person-a)
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("person-a");

        const iconDiv = document.createElement("div");
        iconDiv.classList.add("icon");

        const messageContent = document.createElement("div");
        messageContent.classList.add("message");
        messageContent.textContent = input.value;

        messageDiv.appendChild(iconDiv);
        messageDiv.appendChild(messageContent);
        chatBox.appendChild(messageDiv);

        // Send the message via WebSocket
        socket.send(input.value);

        // Clear the input field
        input.value = "";

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}