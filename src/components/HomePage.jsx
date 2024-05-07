import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PASSWORD } from "./constant"
import "./HomePage.css"
import axios from "axios"
const HomePage = () => {
    const real_password = PASSWORD
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [menu, setMenu] = useState("login")
    const Navigate = useNavigate()


    const signup = async () => {
        try {
            const response = await axios.post("http://localhost:4000/signup", { email: email, password: password })
            const data = response.data
            console.log(data)
            if (data.error) {
                alert(data.error)
            }
            if (data.success) {
                console.log("Success")
                localStorage.setItem("auth-token", data.token)
                Navigate(`/room/${email}`)
            }
            setEmail("")
            setPassword("")
        } catch (error) {
            console.log(error)
        }
    }

    const login = async () => {
        try {
            const response = await axios.post("http://localhost:4000/login", { email: email, password: password })
            const data = response.data
            console.log(data)
            if (data.error) {
                alert(data.error)
            }
            if (data.success) {
                localStorage.setItem("auth-token", data.token)
                Navigate(`/room/${email}`)
            }
            setEmail("")
            setPassword("")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="form-signin">
            <form onSubmit={(e)=> e.preventDefault()}>
                <svg className="user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
                <h1 className="h3 mb-3 fw-normal">Please { menu }</h1>

                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) =>setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" onClick={()=> menu === "login" ? login() : signup()}>
                    {menu}
                </button>
                {menu === "login" ? <p className="menu-setter">Create new Account <span className="here" onClick={()=>setMenu('signup')}>here.</span></p> :  <p className="menu-setter">Already have an account <span className="here" onClick={()=>setMenu('login')}>Login.</span></p>}
                <p className="mt-5 mb-3 text-muted">&copy; nitishkumar</p>
            </form>
        </main>
    )
}
export default HomePage
