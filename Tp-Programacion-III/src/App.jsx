import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registro from "./components/auth/Registro";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Protected from "./components/protected/Protected";
import TextNotFound from "./components/ui/TextNotFound";
import LandingPage from "./components/landing/LandingPage";
import Home from "./components/home/Home";
import EditProfile from "./components/profile/EditProfile";
import { UserProvider, useUser } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";


const AppContent = () => { // Componente interno que puede usar el contexto
  const { clearUser } = useUser();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    clearUser();
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
          {/* Home protegido - Solo para usuarios normales */}
          <Route path="/home/*" element={<Protected allowedRoles={['user']}> <Home onLogOut={handleLogOut} /> </Protected>} />
          {/* Dashboard protegido - Solo para administradores */}
          <Route
            path="/dashboard/*"
            element={
              <Protected allowedRoles={['admin', 'superadmin']}>
                <Dashboard onLogOut={handleLogOut} />
              </Protected>
            }
          />

          {/* Perfil - Accesible para todos los usuarios autenticados */}
          <Route
            path="/perfil"
            element={
              <Protected allowedRoles={['user', 'admin', 'superadmin']}>
                <EditProfile onLogOut={handleLogOut} />
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
};

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
