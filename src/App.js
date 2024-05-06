import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "./components/HomePage"
import VideoPage from "./components/VideoPage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/room/:id" element={<VideoPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
