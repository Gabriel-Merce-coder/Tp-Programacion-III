import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-vh-100 bg-dark">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Registro y Login */}
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />

          {/* Home protegido */}
          <Route
            path="/home/*"
            element={
              <Protected>
                <Home onLogOut={handleLogOut} />
              </Protected>
            }
          />

          {/* Dashboard protegido */}
          <Route
            path="/dashboard/*"
            element={
              <Protected>
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
