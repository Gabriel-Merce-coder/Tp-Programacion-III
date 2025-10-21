import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../profileMenu/ProfileMenu";
import DeleteModal from "../ui/Mymodal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ onLogOut }) => {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const handleDeleteAccount = () => {
    setShowDelete(false);

    toast.success("Cuenta eliminada correctamente", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
    });

    onLogOut(); // Desloguea al usuario

    setTimeout(() => {
      navigate("/registro");
    }, 1600);
  };

  const handleLogOut = () => {
    onLogOut();

    toast.success("Sesión cerrada correctamente", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
    });

    setTimeout(() => {
      navigate("/login");
    }, 1600);
  };

  return (
    <>
      <nav className="navbar bg-black py-3 px-4">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1 className="text-danger fw-bold mb-0">Cine App</h1>
          <div className="d-flex align-items-center gap-2">
            {/* Botones de navegación */}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("add-movie")}
            >
              ➕ Agregar Película
            </Button>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("add-function")}
            >
              🎬 Agregar Función
            </Button>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("add-sala")}
            >
              🏛️ Agregar Sala
            </Button>

            {/* /////////////////////////////////////////////////////////
                CAMBIO JULIAN: nuevo botón para ver el historial de reservas
                ///////////////////////////////////////////////////////// */}
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => navigate("/home/historial-reservas")}
            >
              📜 Historial
            </Button>
            {/* FIN CAMBIO JULIAN */}

            <ProfileMenu
              onDeleteAccount={handleShowDelete}
              onLogOut={handleLogOut}
            />
          </div>
        </div>
      </nav>

      <DeleteModal
        show={showDelete}
        onHide={handleCloseDelete}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
};

export default Navbar;
