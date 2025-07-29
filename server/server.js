const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, "db.json");

function readDB() {
  const data = fs.readFileSync(DB_PATH);
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

app.post("/api/register", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const db = readDB();
  const existingUser = db.users.find((u) => u.username === username);

  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  const newUser = {
    id: Date.now().toString(),
    username,
    transactions: [],
  };

  db.users.push(newUser);
  writeDB(db);

  res.json({ message: "User registered", user: newUser });
});

app.post("/api/login", (req, res) => {
  const { username } = req.body;
  const db = readDB();

  const user = db.users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "Login successful", user });
});

app.post("/api/transaction", (req, res) => {
  const { userId, type, amount, category, description, date } = req.body;

  if (!userId || !type || !amount || !category || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = readDB();
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const newTransaction = {
    id: Date.now().toString(),
    type,
    amount,
    category,
    description: description || "",
    date,
  };

  user.transactions.push(newTransaction);
  writeDB(db);

  res.json({ message: "Transaction added", transaction: newTransaction });
});

app.get("/api/transactions/:userId", (req, res) => {
  const { userId } = req.params;
  const db = readDB();
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user.transactions);
});

app.delete("/api/transaction/:userId/:transactionId", (req, res) => {
  const { userId, transactionId } = req.params;
  const db = readDB();
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.transactions = user.transactions.filter((t) => t.id !== transactionId);
  writeDB(db);

  res.json({ message: "Transaction deleted" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
