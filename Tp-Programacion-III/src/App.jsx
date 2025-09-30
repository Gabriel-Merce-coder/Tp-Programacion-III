import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registro from './components/auth/Registro'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import Protected from './components/protected/Protected'
import { useEffect, useState } from 'react'
import TextNotFound from './components/textNotFound/TextNotFound'

function App() {
  const [logIn, setLogIn] = useState(false)

  console.log("App render - logIn:", logIn);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("App useEffect - token:", token);
    if (token) {
      setLogIn(true);
      console.log("App useEffect - setLogIn(true)");
    } else {
      setLogIn(false);
      console.log("App useEffect - setLogIn(false)");
    }
  }, [])

  const handleLogIn = () => {
    setLogIn(true);
  }
  const handleLogOut = () => {
    setLogIn(false);
    localStorage.removeItem("token");
  }
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <BrowserRouter>
          <Routes>
            <Route path="/registro" element={<Registro onLogin={handleLogIn} />} />
            <Route path="/login" element={<Login onLogin={handleLogIn} />} />
            <Route path="/dashboard" element={<Protected><Dashboard onLogOut={handleLogOut} /></Protected>} />
            <Route path="*" element={<TextNotFound />}></Route>
          </Routes>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
