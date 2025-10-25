import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../../peliculas/Movie.Item";
import Mymodal from "../../ui/Mymodal";

const PeliculaSection = ({ peliculas, onEditFilm, onStatusChange }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  if (!peliculas) {
    return <div className="text-white">Cargando películas...</div>;
  }

  if (!Array.isArray(peliculas)) {
    return (
      <div className="text-white text-center py-5">
        <h3>Error al cargar películas</h3>
        <p>Intenta recargar la página</p>
      </div>
    );
  }

  if (peliculas.length === 0) {
    return (
      <div className="text-white text-center py-5">
        <h3>No hay películas disponibles</h3>
        <p>Prueba más tarde</p>
      </div>
    );
  }

  const handleToggleClick = (peli) => {
    setSelectedFilm(peli);
    setShowConfirm(true);
  };

  const confirmToggle = () => {
    if (selectedFilm && onStatusChange) {
      onStatusChange(selectedFilm.id);
    }
    setShowConfirm(false);
    setSelectedFilm(null);
  };

  return (
    <div>
      <Row>
        {peliculas.map((peli, index) => (
          <Col
            key={peli.id ?? `temp-${index}`}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            className="mb-4"
          >
            <MovieCard
              movie={peli}
              onEdit={() => onEditFilm && onEditFilm(peli)}
              onStatusChange={() => handleToggleClick(peli)}
            />
          </Col>
        ))}
      </Row>

      <Mymodal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmToggle}
        title={`${selectedFilm?.estado ? "Desactivar" : "Activar"} Película`}
        message={`¿Deseas ${selectedFilm?.estado ? "desactivar" : "activar"} la película "${selectedFilm?.titulo}"?`}
        confirmText={selectedFilm?.estado ? "Sí, desactivar" : "Sí, activar"}
        cancelText="Cancelar"
      />
    </div>
  );
};

export default PeliculaSection;
