import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import UserInputForm from "./components/UserInputForm"
import DoppelgangerProfile from "./components/DoppelgangerProfile"
import ChatHistory from "./components/ChatHistory"
import Navbar from "./components/Navbar"
import "./index.css"

// Import new feature components
import MentorMode from "./components/MentorMode"
import CareerPathway from "./components/CareerPathway"
import SafeSpace from "./components/SafeSpace"
import StorytellingMode from "./components/StorytellingMode"
import ProductivityDashboard from "./components/ProductivityDashboard"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          {/* Original routes */}
          <Route path="/home" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<LandingPage />} />
          <Route path="/create" element={<UserInputForm />} />
          <Route path="/profile" element={<DoppelgangerProfile />} />
          <Route path="/history" element={<ChatHistory />} />

          {/* New feature routes */}
          <Route path="/mentor" element={<MentorMode />} />
          <Route path="/career" element={<CareerPathway />} />
          <Route path="/therapy" element={<SafeSpace />} />
          <Route path="/storytelling" element={<StorytellingMode />} />
          <Route path="/productivity" element={<ProductivityDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

