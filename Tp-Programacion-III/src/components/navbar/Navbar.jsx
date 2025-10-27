import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../profile/ProfileMenu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../context/UserContext";
import "./Navbar.css"; // Importamos los estilos

const Navbar = ({ onLogOut }) => {
  const navigate = useNavigate();

  const { user } = useUser();
  const role = user?.role;

  const handleLogOut = () => {
    onLogOut();
    toast.success("Sesión cerrada correctamente", { position: "top-right", autoClose: 1500, hideProgressBar: true });
    setTimeout(() => navigate("/login"), 1600);
  };

  const handleLogoClick = () => {
    if (role === 'user') {
      navigate('/home');
    } else if (role === 'admin' || role === 'superadmin') {
      navigate('/dashboard');
    }
  };
  return (
    <>
      <nav className="navbar bg-black py-3 px-4">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1
            className="text-danger fw-bold mb-0"
            style={{ cursor: "pointer" }}
            onClick={handleLogoClick}
          >
            Cine App
          </h1>
          <div className="d-flex align-items-center gap-2">
            {(role === "admin" || role === "superadmin") && (
              <>
                <Button variant="outline-primary" size="sm" onClick={() => navigate("/dashboard/add-movie")}> Agregar Película</Button>
                <Button variant="outline-primary" size="sm" onClick={() => navigate("/dashboard/add-function")}> Agregar Función</Button>
                <Button variant="outline-primary" size="sm" onClick={() => navigate("/dashboard/add-sala")}> Agregar Sala</Button>
                <Button variant="outline-info" size="sm" onClick={() => navigate("/dashboard/historial-reservas")}> Historial</Button>
                <Button variant="outline-info" size="sm" onClick={() => navigate("/dashboard/view-users")}> Ver Usuarios</Button>
                <Button variant="outline-info" size="sm" onClick={() => navigate("/dashboard/view-salas")}> Ver salas</Button>
                <Button variant="outline-info" size="sm" onClick={() => navigate("/dashboard/view-functions")}> Ver Funciones</Button>
              </>
            )}
            {(role === "user") && (
              <>
                <Button variant="outline-info" size="sm" onClick={() => { navigate("/home/my-reservations") }}>
                  Mis Reservas
                </Button>

              </>
            )}
            <ProfileMenu onLogOut={handleLogOut} />
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
