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

app.listen(5001);
