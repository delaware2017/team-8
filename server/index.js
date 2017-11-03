const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("account/registration", (req, res) => {
    // Registers a new user.
});

app.post("account/update", (req, res) => {
    // Updates an account
});

app.post("account/remove", (req, res) => {
    // Remove an account (for some reason?)
});

app.post("account/update/balance", (req, res) => {
    // Update a user balance
});

app.listen(process.env.PORT || 3000);