import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import MyArticles from "./pages/MyArticles"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { useEffect, useState } from "react"


function App() {
  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])
  return (
    <BrowserRouter>
      <nav>
        <h1>BlogPost</h1>
        
        <Link to="/home">Home</Link>
        <Link to="/create">Create New Article</Link>
        <Link to="/articles">My Articles</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/">Login</Link>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/articles" element={<MyArticles />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Login setToken={setToken}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
