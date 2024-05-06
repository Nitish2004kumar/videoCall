import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PASSWORD } from "./constant"
const HomePage = () => {
    const real_password = PASSWORD;
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const Navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault();
        if (password === real_password) {
            Navigate(`/room/${userName}`)
        } else {
            alert("Incorrect password")
        }
    }
    return (
 
            <form onSubmit={submitHandler}>
                <label htmlFor="username">Username : </label>
                <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    id="username"
                    placeholder="Enter your name..."
                />
                <br />
                <label htmlFor="password">Password : </label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    placeholder="Enter your password..."
                />
                <br />
                <button type="submit">Join</button>
            </form>
    )
}
export default HomePage
