import { Card, Button } from "react-bootstrap";

const FuncionItem = ({ funcion, peliculas, onDelete, onEdit }) => {
  const pelicula = peliculas.find((p) => p.id === funcion.peliculaId);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          🎬 {pelicula ? pelicula.titulo : "Película Desconocida"}
        </Card.Title>
        <Card.Text>
          Sala: {funcion.salaId} <br />
          Fecha: {funcion.fecha} <br />
          Hora: {funcion.hora} <br />
          Precio: ${funcion.precio} <br />
          Estado: {funcion.estado ? "Activa" : "Inactiva"}
        </Card.Text>

        {/* Botones */}
        <div className="d-flex gap-2 mt-2">
          {/* /////////////////////////////////////////////////////////
              CAMBIO JULIAN: botones editar y eliminar funcionales
              ///////////////////////////////////////////////////////// */}
          <Button
            variant="warning"
            size="sm"
            onClick={() => onEdit(funcion)} // Editar función
          >
            ✏️ Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete} // Eliminar función
          >
            🗑️ Eliminar
          </Button>
          {/* FIN CAMBIO JULIAN */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default FuncionItem;


