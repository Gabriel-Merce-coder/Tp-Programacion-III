import { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";

const MovieCard = ({ movie, onDelete, onEdit }) => {
  const { titulo, genero, descripcion, reparto, calificacion, imageUrl, duracion } = movie;
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <>
      <Card
        className="bg-dark text-white border-0 shadow-lg movie-card"
        style={{ transition: "transform 0.2s ease-in-out", cursor: "pointer" }}
      >
        <div className="position-relative" style={{ overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={titulo}
            style={{
              height: "300px",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
            }}
          />
          <Badge
            bg="warning"
            text="dark"
            className="position-absolute top-0 end-0 m-2 d-flex align-items-center"
          >
            <BsStarFill className="me-1" />
            {calificacion}
          </Badge>
        </div>

        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-6 fw-bold mb-2" style={{ minHeight: "3rem" }}>
            {titulo}
          </Card.Title>

          <Badge bg="secondary" className="mb-2 align-self-start">
            {genero.split(",")[0].trim()}
          </Badge>

          <div className="d-flex gap-2 mt-2">
            <Button variant="outline-light" size="sm">
              ▶ Ver Película
            </Button>
            <Button
              variant={showDetails ? "outline-info" : "outline-secondary"}
              size="sm"
              onClick={toggleDetails}
            >
              {showDetails ? "▲ Ocultar Detalles" : "▼ Ver Detalles"}
            </Button>

            {/* /////////////////////////////////////////////////////////
                CAMBIO JULIAN: botones de editar y eliminar
                ///////////////////////////////////////////////////////// */}
            <Button variant="warning" size="sm" onClick={() => onEdit(movie)}>
              ✏️ Editar
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(movie.id)}>
              🗑️ Eliminar
            </Button>
            {/* FIN CAMBIO JULIAN */}
          </div>
        </Card.Body>
      </Card>

      {showDetails && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "80%",
            height: "100%",
            backgroundColor: "#111",
            color: "white",
            padding: "20px",
            overflowY: "auto",
            zIndex: 2000,
            display: "flex",
            gap: "20px",
            transition: "transform 0.3s ease",
          }}
        >
          <div style={{ flex: "1 1 40%" }}>
            <img src={imageUrl} alt={titulo} style={{ width: "100%", borderRadius: "5px" }} />
          </div>

          <div
            style={{
              flex: "1 1 60%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2>{titulo}</h2>
              <p>
                <strong>Género:</strong> {genero}
              </p>
              <p>
                <strong>Duración:</strong> {duracion} min
              </p>
              <p>
                <strong>Reparto:</strong> {reparto}
              </p>
              <p>
                <strong>Descripción:</strong> {descripcion}
              </p>
            </div>
            <div className="text-end mt-3">
              <Button variant="outline-light" onClick={toggleDetails}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .movie-card:hover {
          transform: scale(1.05);
          z-index: 100;
        }
        .movie-card:hover .card-img-top {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default MovieCard;

