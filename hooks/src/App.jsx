import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import UserInputForm from "./components/UserInputForm"
import DoppelgangerProfile from "./components/DoppelgangerProfile"
import ChatHistory from "./components/ChatHistory"
import Navbar from "./components/Navbar"
import "./index.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<UserInputForm />} />
          <Route path="/profile" element={<DoppelgangerProfile />} />
          <Route path="/history" element={<ChatHistory />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

