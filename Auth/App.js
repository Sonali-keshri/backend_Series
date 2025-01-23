const express = require("express")
const path = require("path");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")


const userModel = require("./model/user");


app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("__dirname", "public")));

app.get("/", function (req, res) {
    res.render("index");
})

app.post('/create', async function (req, res) {
    const { username, email, password, age } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
        res.send(" User Already exist ")
        return;
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const createUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            })

            const token = jwt.sign({ email: email }, 'secretkey')
            res.cookie("token", token)
            res.send(createUser)
        })
    })
})

app.get("/login", function (req, res) {
    // console.log(req.cookies.token)
    res.render("login");
})

app.post('/login', async function (req, res) {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
        res.send(" something went wrong")
        return;
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (!result) {
            res.send("Email or Password is not valid")
            return;
        }
        const token = jwt.sign({ email: user.email }, 'secretkey')
        res.cookie("token", token)
        res.send(`${user.username} logged in Successfully`)
    })

})
app.get("/logout", function (req, res) {
    res.clearCookie("token")
    res.redirect("/login");
})

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})