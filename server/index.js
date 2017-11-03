const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("account/registration", (req, res) => {
    // Registers a new user.
})

app.listen(process.env.PORT || 3000);