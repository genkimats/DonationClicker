const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// In-memory "database" for simplicity
const users = {};
let totalDonations = 0;
let totalChildrenSaved = 0;

const DONATION_PER_CHILD = 500;

function updateTotals() {
  const childrenSaved = Math.floor(totalDonations / DONATION_PER_CHILD);
  if (childrenSaved !== totalChildrenSaved) {
    totalChildrenSaved = childrenSaved;
  }
}

function getLeaderboard() {
  return Object.values(users)
    .sort((a, b) => b.donated - a.donated)
    .slice(0, 10)
    .map((user) => ({ username: user.username, donated: user.donated }));
}

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("register", (username, password, callback) => {
    if (users[username]) {
      return callback({ success: false, message: "Username already taken." });
    }
    users[username] = { username, password, donated: 0, clicks: 0 };
    console.log(`User registered: ${username}`);
    callback({ success: true, user: { username, donated: 0, clicks: 0 } });
  });

  socket.on("login", (username, password, callback) => {
    const user = users[username];
    if (!user || user.password !== password) {
      return callback({ success: false, message: "Invalid credentials." });
    }
    console.log(`User logged in: ${username}`);
    socket.username = username;
    callback({ success: true, user });
  });

  socket.on("donate", (amount, clicks) => {
    if (socket.username && users[socket.username]) {
      users[socket.username].donated += amount;
      users[socket.username].clicks += clicks;
      totalDonations += amount;
      updateTotals();

      // Broadcast updates to all clients
      io.emit("updateLeaderboard", getLeaderboard());
      io.emit("updateTotals", { totalDonations, totalChildrenSaved });
    }
  });

  // Send initial data on connect
  socket.emit("updateLeaderboard", getLeaderboard());
  socket.emit("updateTotals", { totalDonations, totalChildrenSaved });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);
});
