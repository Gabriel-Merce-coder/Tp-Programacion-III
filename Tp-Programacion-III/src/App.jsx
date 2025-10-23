import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Registro from "./components/auth/Registro";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Protected from "./components/protected/Protected";
import TextNotFound from "./components/textNotFound/TextNotFound";
import LandingPage from "./components/landing/LandingPage";
import Home from "./components/home/Home"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [logIn, setLogIn] = useState(false);

  const handleLogIn = () => setLogIn(true);
  const handleLogOut = () => setLogIn(false);

  return (
    <div className="min-vh-100 bg-dark">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Registro y Login */}
          <Route path="/registro" element={<Registro onLogin={handleLogIn} />} />
          <Route path="/login" element={<Login onLogin={handleLogIn} />} />
          {/*Home Protegido*/}
          <Route
            path="/home/*"
            element={
              <Protected isSingedIn={logIn}>
                <Home onLogOut={handleLogOut} />
              </Protected>
            }
          />

          {/* Dashboard protegido */}
          <Route
            path="/dashboard/*"
            element={
              <Protected isSingedIn={logIn}>
                <Dashboard onLogOut={handleLogOut} />
              </Protected>
            }
          />

          {/* Ruta por defecto */}
          <Route path="*" element={<TextNotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer autoClose={1000} hideProgressBar={true} />
    </div>
  );
}

export default App;
