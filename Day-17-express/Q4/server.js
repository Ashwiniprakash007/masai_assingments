// server.js
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json()); 

const DB_FILE = "./db.json";

function readDB() {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

app.post("/books", (req, res) => {
  const books = readDB();
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newBook = {
    id: Date.now(),
    title,
    author,
    year,
  };

  books.push(newBook);
  writeDB(books);
  res.status(201).json(newBook);
});

app.get("/books", (req, res) => {
  const books = readDB();
  res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
  const books = readDB();
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.put("/books/:id", (req, res) => {
  const books = readDB();
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ error: "All fields are required." });
  }

  books[index] = { id, title, author, year };
  writeDB(books);
  res.status(200).json(books[index]);
});

app.delete("/books/:id", (req, res) => {
  const books = readDB();
  const id = parseInt(req.params.id);
  const updatedBooks = books.filter((b) => b.id !== id);

  if (books.length === updatedBooks.length) {
    return res.status(404).json({ message: "Book not found" });
  }

  writeDB(updatedBooks);
  res.status(200).json({ message: "Book deleted successfully" });
});

app.get("/books/search", (req, res) => {
  const { author, title } = req.query;
  const books = readDB();

  let filtered = books;

  if (author) {
    const auth = author.toLowerCase();
    filtered = filtered.filter((b) =>
      b.author.toLowerCase().includes(auth)
    );
  }

  if (title) {
    const tit = title.toLowerCase();
    filtered = filtered.filter((b) =>
      b.title.toLowerCase().includes(tit)
    );
  }

  if (filtered.length > 0) {
    res.status(200).json(filtered);
  } else {
    res.status(404).json({ message: "No books found" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Book Server running at http://localhost:${PORT}`);
});
