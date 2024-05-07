import express from "express"
import mongoose, { mongo } from "mongoose"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

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
            res.json({ succes: false, error: "User already exists" })
        } else {
            const user = new Users({
                email: req.body.email,
                password: req.body.password,
            })
            user.save()

            const data = {
                user: {
                    email:req.body.email
                }
            }
            const token = jwt.sign(data, "secret_videocall")
            res.json({ success: true, token })

        }
    } catch (error) {
        console.log(error)
    }
})

app.listen(4000, (req, res) => {
    console.log(`Server running on ${"http://loclahost:4000/"}`)
})
