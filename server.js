const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public")); // Serve static files

wss.on("connection", (ws) => {
  console.log("New user connected");

  ws.on("message", (message) => {
    console.log("Received: " + message);
    // Broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => console.log("User disconnected"));
});

server.listen(3000, () => console.log("Server running on port 3000"));
