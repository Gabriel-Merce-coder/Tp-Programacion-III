import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registro from './components/auth/Registro'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import Protected from './components/protected/Protected'
import TextNotFound from './components/textNotFound/TextNotFound'

function App() {
  const handleLogOut = () => {
    localStorage.removeItem("token");
  }
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <BrowserRouter>
          <Routes>
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Protected><Dashboard onLogOut={handleLogOut} /></Protected>} />
            <Route path="*" element={<TextNotFound />}></Route>
          </Routes>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
