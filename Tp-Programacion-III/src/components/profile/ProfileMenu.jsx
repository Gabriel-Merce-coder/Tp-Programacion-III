import { Dropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ onLogOut }) => {
  const navigate = useNavigate();

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="outline-light" id="dropdown-profile" size="sm">
        <PersonCircle size={20} />
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={() => navigate("/perfil")}>
          Ver Perfil
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={onLogOut}>Cerrar Sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileMenu;

