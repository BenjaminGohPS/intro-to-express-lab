const express = require("express");

// /greetings/<username-parameter>

/**
Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.” 
*/
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

app.listen(5001);
