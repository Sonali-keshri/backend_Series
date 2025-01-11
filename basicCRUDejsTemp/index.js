
const express = require("express");
const app = express();
const path = require("path");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set the view engine to ejs
app.set("view engine", "ejs");

// Route
app.get("/", (req, res) => {
    res.render("index"); // Ensure that "index.ejs" exists in the "views" directory
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
