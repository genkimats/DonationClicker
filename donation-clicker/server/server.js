const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const fs = require("fs"); // Import the File System module

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const DB_FILE = "./db.json";
const DONATION_PER_CHILD = 500;

// --- Data Persistence Functions ---

// Reads data from db.json
const readData = () => {
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading from database file:", error);
    // If the file doesn't exist or is corrupt, return a default structure
    return { users: {}, totals: { totalDonations: 0, totalChildrenSaved: 0 } };
  }
};

// Writes data to db.json
const writeData = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to database file:", error);
  }
};

// --- Load Initial Data ---

let { users, totals } = readData();

// --- Helper Functions ---

function updateTotals() {
  const childrenSaved = Math.floor(totals.totalDonations / DONATION_PER_CHILD);
  if (childrenSaved !== totals.totalChildrenSaved) {
    totals.totalChildrenSaved = childrenSaved;
  }
}

function getLeaderboard() {
  return Object.values(users)
    .sort((a, b) => b.donated - a.donated)
    .slice(0, 10)
    .map((user) => ({ username: user.username, donated: user.donated }));
}

// --- Socket.io Logic ---

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("register", (username, password, callback) => {
    if (users[username]) {
      return callback({ success: false, message: "Username already taken." });
    }
    users[username] = { username, password, donated: 0, clicks: 0 };
    writeData({ users, totals }); // <-- Save data to file
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

  socket.on("donate", ({ username, amount, clicks }) => {
    if (users[username]) {
      users[username].donated += amount;
      users[username].clicks += clicks;
      totals.totalDonations += amount;
      updateTotals();
      writeData({ users, totals });

      io.emit("updateLeaderboard", getLeaderboard());
      io.emit("updateTotals", totals);
    }
  });

  // Send initial data on connect
  socket.emit("updateLeaderboard", getLeaderboard());
  socket.emit("updateTotals", totals);

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);
});
