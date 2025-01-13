
const express = require("express");
const app = express();
const path = require("path");

const userModel = require("./models/user")
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set the view engine to ejs
app.set("view engine", "ejs");

// Route
app.get("/", (req, res) => {
    res.render("index"); 
});

app.get("/read", async (req, res) => {
    const allUsers = await userModel.find()
    res.render("read", { users:allUsers });
});

app.post("/create", async (req, res) => {
    const { name, email, imageURL } = req.body;
    const createdUser = await userModel.create({
        name,
        email,
        imageURL
    })
    res.redirect("/read")
})

app.get("/delete/:id", async (req, res) => {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id)
    res.redirect("/read")
})

app.get("/edit/:id",   async (req, res)=>{
    const user = await userModel.findById(req.params.id);
    res.render("edit", { user });
})

app.post("/update/:id", async (req, res) => {
    const { name , email, imageURL } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {name, email, imageURL}, {new: true})
    res.redirect("/read")
})

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
