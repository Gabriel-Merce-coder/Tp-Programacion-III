import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Registro from './components/auth/Registro'
import Login from './components/auth/Login'
import {useState} from 'react'
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
          <Route path= "/registro" element ={<Registro/>}/>
          <Route path= "/login" element ={<Login onLogin = {handleLogIn}/>}/>
          <Route path = "*" element = {<TextNotFound/>}></Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
