const socket = new WebSocket("wss://" + window.location.host);

let username = "";

// Handle incoming messages
socket.onmessage = async (event) => {
    const data = JSON.parse(await event.data.text());
    const chatBox = document.getElementById("chat-box");
    const message = document.createElement("div");
    message.classList.add("message");
    message.classList.add(data.user === "user1" ? "user1" : "user2");
    message.textContent = `${data.user}: ${data.message}`;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
};

// Send a text message
function sendMessage() {
    const input = document.getElementById("message-input");
    const usernameInput = document.getElementById("username");
    if (input.value && usernameInput.value) {
        username = usernameInput.value;
        const message = {
            user: username,
            message: input.value
        };
        socket.send(JSON.stringify(message));
        input.value = ""; // Clear input field
    }
}

// Clear the chat box
function clearChat() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";
}

// Start voice recognition
function startVoiceMessage() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        alert("Your browser does not support voice recognition.");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false; // Only final results
    recognition.maxAlternatives = 1; // Only one result

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const usernameInput = document.getElementById("username");
        if (usernameInput.value) {
            username = usernameInput.value;
            const message = {
                user: username,
                message: transcript
            };
            socket.send(JSON.stringify(message));
        }
    };

    recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
        alert("Error in voice recognition. Please try again.");
    };

    recognition.onspeechend = () => {
        recognition.stop(); // Stop recognition after speech ends
    };
}