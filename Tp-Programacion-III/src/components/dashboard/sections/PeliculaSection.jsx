import { Row, Col } from "react-bootstrap";
import MovieCard from "../../peliculas/Movie.Item";

const PeliculaSection = ({ peliculas, onDeleteFilm, onEditFilm }) => {

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
  return (
    <div>
      <Row>
        {peliculas.map((peli) => (
          <Col key={peli.id} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4">
            <MovieCard
              movie={peli}
              onDelete={onDeleteFilm ? () => onDeleteFilm(peli.id) : undefined}
              onEdit={onEditFilm ? () => onEditFilm(peli) : undefined}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default PeliculaSection;