// /////////////////////////////////////////////////////////
// CAMBIO JULIAN: Navegación al perfil del usuario
// /////////////////////////////////////////////////////////
import { Dropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom"; // CAMBIO JULIAN

const ProfileMenu = ({ onDeleteAccount, onLogOut }) => {
  const navigate = useNavigate(); // CAMBIO JULIAN

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="outline-light" id="dropdown-profile" size="sm">
        <PersonCircle size={20} />
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={() => navigate("/home/perfil")}>
          Ver Perfil {/* CAMBIO JULIAN */}
        </Dropdown.Item>
        <Dropdown.Item onClick={onDeleteAccount}>Eliminar Cuenta</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={onLogOut}>Cerrar Sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileMenu;
// FIN CAMBIO JULIAN

