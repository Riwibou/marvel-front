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
import ComicFocus from "./pages/ComicFocus"
import ComicsOf1Hero from "./pages/ComicsOf1Hero"
import Bookmarks from "./pages/Bookmarks"
import Login from "./pages/Login"
import Signup from "./pages/Signup"


function App() {
  const [token, setToken] = useState(Cookies.get("vinted-token") || null)

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
        <Route path="/" element={<Characters />} />
        <Route path="/character/:characterId" element={<CharacterFocus />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/comicId" element={<ComicFocus />} />
        <Route path="/comics/:characterId" element={<ComicsOf1Hero />} />
        <Route path="/user/bookmarks" element={<Bookmarks token={token}/>} />
        <Route path="/login" element={<Login handleToken={handleToken}/>}/>
        <Route path="/signup" element={<Signup handleToken={handleToken}/>}/>
        <Route path="*" element={<p>Error 404</p>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
