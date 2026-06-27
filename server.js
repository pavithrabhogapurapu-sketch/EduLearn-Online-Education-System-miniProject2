const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/educationDB")
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch(err => {
    console.log(err);
});

// Home Route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Login API
app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    const user = await User.findOne({
        username,
        password
    });

    if (user) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false
        });
    }

});

app.listen(5000, () => {
    console.log("🚀 Server Running at http://localhost:5000");
});