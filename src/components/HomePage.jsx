import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PASSWORD } from "./constant"
import "./HomePage.css"
const HomePage = () => {
    const real_password = PASSWORD
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const Navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        if (password === real_password) {
            Navigate(`/room/${userName}`)
        } else {
            alert("Incorrect password")
        }
    }
    return (
        //     <form onSubmit={submitHandler}>
        //         <label htmlFor="username">Username : </label>
        //         <input
        //             value={userName}
        //             onChange={(e) => setUserName(e.target.value)}
        //             type="text"
        //             id="username"
        //             placeholder="Enter your name..."
        //         />
        //         <br />
        //         <label htmlFor="password">Password : </label>
        //         <input
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             type="password"
        //             id="password"
        //             placeholder="Enter your password..."
        //         />
        //         <br />
        //         <button type="submit">Join</button>
        // </form>

        <main class="form-signin">
            <form onSubmit={submitHandler}>
                <svg class="user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating">
                    <input
                        type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label for="floatingPassword">Password</label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">
                    Sign in
                </button>
                <p class="mt-5 mb-3 text-muted">&copy; 2024</p>
            </form>
        </main>
    )
}
export default HomePage
