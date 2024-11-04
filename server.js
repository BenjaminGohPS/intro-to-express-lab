const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/greetings/:userName", (req, res) => {
  res.json(`Hello there, ${req.params.userName}`);
});

app.get("/roll/:numberParameter", (req, res) => {
  if (!isNaN(req.params.numberParameter)) {
    const randomNumber = Math.round(Math.random() * req.params.numberParameter);
    res.json(randomNumber);
  } else {
    res.json("You must specify a number.");
  }
});

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const index = req.params.index;
  if (index < collectibles.length) {
    res.json(
      `The ${collectibles[index].name} can be yours for ${collectibles[index].price}!`
    );
  } else {
    res.json("This item is not yet in stock. Check back soon!");
  }
});

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];



app.get("/shoes", (req, res) => {
  let filteredShoes = shoes;
  const minPrice = 1 * req.query["min-price"]; // mtd 1: convert strings to numbers
  const maxPrice = parseFloat(req.query["max-price"]); // mtd 2: convert strings to numbers
  const type = req.query.type;

  if (!isNaN(minPrice)) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
  } else if (req.query["min-price"]) {
    return res.status(404).json("This is not a valid price");
  }

  if (!isNaN(maxPrice)) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
  } else if (req.query["max-price"]) {
    return res.status(404).json("This is not a valid price");
  }

  if (type) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.type === type);
  }

  res.json(filteredShoes);
});

app.listen(5001);
