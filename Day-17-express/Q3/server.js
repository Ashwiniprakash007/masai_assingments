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

app.post("/dishes", (req, res) => {
  const dishes = readDB();
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newDish = {
    id: Date.now(),
    name,
    price,
    category,
  };

  dishes.push(newDish);
  writeDB(dishes);
  res.status(201).json(newDish);
});

app.get("/dishes", (req, res) => {
  const dishes = readDB();
  res.status(200).json(dishes);
});

app.get("/dishes/:id", (req, res) => {
  const dishes = readDB();
  const id = parseInt(req.params.id);
  const dish = dishes.find((d) => d.id === id);

  if (dish) {
    res.status(200).json(dish);
  } else {
    res.status(404).json({ message: "Dish not found" });
  }
});

app.put("/dishes/:id", (req, res) => {
  const dishes = readDB();
  const id = parseInt(req.params.id);
  const index = dishes.findIndex((d) => d.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Dish not found" });
  }

  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: "All fields are required." });
  }

  dishes[index] = { id, name, price, category };
  writeDB(dishes);
  res.status(200).json(dishes[index]);
});

app.delete("/dishes/:id", (req, res) => {
  let dishes = readDB();
  const id = parseInt(req.params.id);
  const updatedDishes = dishes.filter((d) => d.id !== id);

  if (dishes.length === updatedDishes.length) {
    return res.status(404).json({ message: "Dish not found" });
  }

  writeDB(updatedDishes);
  res.status(200).json({ message: "Dish deleted successfully" });
});

app.get("/dishes/get", (req, res) => {
  const { name } = req.query;
  const dishes = readDB();

  if (!name) {
    return res.status(400).json({ message: "Dish name is required in query" });
  }

  const lowerName = name.toLowerCase();
  const matches = dishes.filter((d) =>
    d.name.toLowerCase().includes(lowerName)
  );

  if (matches.length > 0) {
    res.status(200).json(matches);
  } else {
    res.status(404).json({ message: "No dishes found" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
