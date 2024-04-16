import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// components
import Header from "./components/Header";

// pages
import Characters from "./pages/Characters"
import CharacterFocus from "./pages/CharacterFocus"
import Comics from "./pages/Comics"
import Comic from "./pages/Comic"
import ComicsOf1Hero from "./pages/ComicsOf1Hero"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"


function App() {
  const [token, setToken] = useState(Cookies.get("marvel-token") || null)

  const handleToken =(token) => {
    if(token) { Cookies.set("marvel-token", token, {expires: 15})
    setToken(token)
    } else {
    Cookies.remove("marvel-token")
    setToken(null)
    }
  }

  return (
    <>
    <Router>
    <Header
      token={token}
      handleToken={handleToken}/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:characterId" element={<CharacterFocus />} />
        <Route path="/comic/:comicId" element={<Comic />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:characterId" element={<ComicsOf1Hero />} />
        <Route path="/login" element={<Login handleToken={handleToken}/>}/>
        <Route path="/signup" element={<Signup handleToken={handleToken}/>}/>
        <Route path="*" element={<p>Error 404</p>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
