import { Dropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

const ProfileMenu = ({ onViewProfile, onDeleteAccount, onLogOut }) => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="outline-light" id="dropdown-profile" size="sm">
        <PersonCircle size={20} />
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={onViewProfile}>Ver Perfil</Dropdown.Item>
        <Dropdown.Item onClick={onDeleteAccount}>Eliminar Cuenta</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={onLogOut}>Cerrar Sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileMenu;
