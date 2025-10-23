import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../profile/ProfileMenu";
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
    toast.success("Cuenta eliminada correctamente", { position: "top-right", autoClose: 1500, hideProgressBar: true });
    setTimeout(() => navigate("/"), 1600);
    onLogOut();
  };

  const handleLogOut = () => {
    onLogOut();
    toast.success("Sesión cerrada correctamente", { position: "top-right", autoClose: 1500, hideProgressBar: true });
    setTimeout(() => navigate("/login"), 1600);
  };

  return (
    <>
      <nav className="navbar bg-black py-3 px-4">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1 className="text-danger fw-bold mb-0" style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
            Cine App
          </h1>

          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("add-movie")}
            >
              Agregar Película
            </Button>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("add-function")}
            >
              Agregar Función
            </Button>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("add-sala")}
            >
              Agregar Sala
            </Button>

            <Button
              variant="outline-info"
              size="sm"
              onClick={() => navigate("historial-reservas")}
            >
              Historial
            </Button>

            <ProfileMenu onDeleteAccount={handleShowDelete} onLogOut={handleLogOut} />
          </div>
        </div>
      </nav>

      <DeleteModal
        show={showDelete}
        onHide={handleCloseDelete}
        onConfirm={handleDeleteAccount}
        title="Confirmar eliminación"
        message="¿Está seguro que desea eliminar la cuenta?"
        confirmText="Sí, deseo eliminar cuenta"
        cancelText="No, cancelar"
      />
    </>
  );
};

export default Navbar;
