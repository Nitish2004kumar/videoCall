import express from "express"
import mongoose, { mongo } from "mongoose"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import cors from "cors"
import dotenv from "dotenv"

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

app.use(
    cors({
        origin: [""],
        methods: ["POST", "GET"],
        credentials: true,
    })
)

mongoose
    .connect("mongodb+srv://nitish:nitish123@cluster0.ykw3t8y.mongodb.net/?retryWrites=true&w=majority&appName=VideoCall")
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err))

const Users = mongoose.model("Users", {
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
})

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/signup", async (req, res) => {
    try {
        const check = await Users.findOne({ email: req.body.email })
        if (check) {
            res.json({ succes: false, error: "User already exists, please try Login" })
        } else {
            const user = new Users({
                email: req.body.email,
                password: req.body.password,
            })
            user.save()

            const data = {
                user: {
                    email: req.body.email,
                },
            }
            const token = jwt.sign(data, "secret_videocall")
            res.json({ success: true, token })
        }
    } catch (error) {
        console.log(error)
    }
})

app.post("/login", async (req, res) => {
    const user = await Users.findOne({ email: req.body.email })
    if (user) {
        if (user.password === req.body.password) {
            const data = {
                user: {
                    email: req.body.email,
                },
            }
            const token = jwt.sign(data, "secret_videocall")
            res.json({ success: true, token })
        } else {
            res.json({ succes: false, error: "Incorrect password" })
        }
    } else {
        res.json({ succes: false, error: "No such user registered,please try signup" })
    }
})

app.listen(4000, (req, res) => {
    console.log(`Server running on ${"http://loclahost:4000/"}`)
})
