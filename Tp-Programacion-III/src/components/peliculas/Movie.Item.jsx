import { useState } from "react";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../ui/Mymodal";
import { useUser } from "../../context/UserContext";
import useFuncionesByPelicula from "../../hooks/useFuncionesByPelicula";

const MovieCard = ({ movie = {}, onDelete, onEdit }) => {
  const {
    id = null,
    titulo = "Sin título",
    genero = "",
    descripcion = "Sin descripción",
    reparto = "No especificado",
    calificacion = 0,
    imageUrl = "",
    duracion = "N/A",
  } = movie;

  const [showDetails, setShowDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const role = user?.role;
  const toggleDetails = () => setShowDetails(!showDetails);

  // Hook para obtener funciones de la película
  const { funciones, loading, error } = useFuncionesByPelicula(showDetails ? id : null);

  const handleConfirmDelete = () => {
    setShowConfirm(false);
    if (onDelete && id !== null) onDelete(id);
  };

  // Split seguro
  const generoArray = typeof genero === "string" ? genero.split(",") : [];

  return (
    <>
      <Card
        className="bg-dark text-white border-0 shadow-lg movie-card"
        style={{ transition: "transform 0.2s ease-in-out", cursor: "pointer" }}
      >
        <div className="position-relative" style={{ overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={imageUrl || "https://dummyimage.com/300x450/000/fff&text=No+Image"}
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

          {generoArray.length > 0 && (
            <Badge bg="secondary" className="mb-2 align-self-start">
              {generoArray[0].trim()}
            </Badge>
          )}

          <div className="d-flex flex-wrap gap-2 mt-2">
            {role === "user" && (
              <>
                <Button variant={showDetails ? "outline-info" : "outline-success"} size="sm" onClick={toggleDetails}>
                  {showDetails ? "Ocultar Película" : "Ver Película"}
                </Button>
              </>
            )}
            {(role === "admin" || role === "superadmin") && (
              <>
                <Button variant="warning" size="sm" onClick={() => onEdit && onEdit(movie)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => setShowConfirm(true)}>
                  Eliminar
                </Button>
              </>
            )}
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
            <img
              src={imageUrl || "https://dummyimage.com/300x450/000/fff&text=No+Image"}
              alt={titulo}
              style={{ width: "100%", borderRadius: "5px" }}
            />
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
              <p><strong>Género:</strong> {genero || "Sin género"}</p>
              <p><strong>Duración:</strong> {duracion} min</p>
              <p><strong>Reparto:</strong> {reparto || "No especificado"}</p>
              <p><strong>Descripción:</strong> {descripcion}</p>

              {/* Sección de Funciones */}
              <div className="mt-4">
                <h5>Funciones Disponibles:</h5>
                {loading ? (
                  <div className="d-flex align-items-center">
                    <Spinner animation="border" size="sm" className="me-2" />
                    <span>Cargando funciones...</span>
                  </div>
                ) : error ? (
                  <p className="text-danger">{error}</p>
                ) : funciones.length > 0 ? (
                  <div>
                    {Object.entries(
                      funciones.reduce((acc, funcion) => {
                        if (!acc[funcion.fecha]) {
                          acc[funcion.fecha] = [];
                        }
                        acc[funcion.fecha].push(funcion);
                        return acc;
                      }, {})
                    ).map(([fecha, funcionesFecha]) => (
                      <div key={fecha} className="mb-3">
                        <p className="text-white mb-2">{fecha}</p>
                        <div className="d-flex flex-wrap gap-2">
                          {funcionesFecha.map((funcion) => (
                            <Badge
                              key={funcion.id}
                              bg="primary"
                              className="px-3 py-2"
                              style={{ fontSize: '0.9rem', cursor: 'pointer' }}
                              onClick={() => navigate(`/home/add-reserva?funcionId=${funcion.id}`)}
                            >
                              {funcion.hora}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white">No hay funciones disponibles</p>
                )}
              </div>
            </div>
            <div className="text-end mt-3">
              <Button variant="outline-light" onClick={toggleDetails}>Cerrar</Button>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar eliminación"
        message={`¿Deseás eliminar la película "${titulo}"?`}
        confirmText="Sí, eliminar"
        cancelText="No, cancelar"
      />

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
