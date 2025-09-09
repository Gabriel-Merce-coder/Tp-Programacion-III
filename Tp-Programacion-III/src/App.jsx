import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Registro from './components/auth/Registro'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import Protected from './components/protected/Protected'
import { useState } from 'react'
import TextNotFound from './components/textNotFound/TextNotFound'
function App() {
  const [logIn, setLogIn] = useState(false)

  const handleLogIn = () =>{
    setLogIn(true);
  }
  const handleLogOut = () =>{
    setLogIn(false);
  }
  return (
    <>
    <div className="d-flex flex-column align-items-center">
      <BrowserRouter>
        <Routes>
          <Route path= "/registro" element ={<Registro onLogin = {handleLogIn}/>}/>
          <Route path= "/login" element ={<Login onLogin = {handleLogIn}/>}/>
          <Route path = "/dashboard" element = {<Protected isSingedIn={logIn}><Dashboard onLogOut={handleLogOut}/></Protected>}/>
          <Route path = "*" element = {<TextNotFound/>}></Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
