import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ show, onHide, onConfirm, tittle, message, confirmText, cancelText }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{tittle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {cancelText || "Cancelar"}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmText || "Eliminar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
