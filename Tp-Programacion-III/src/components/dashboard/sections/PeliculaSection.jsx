import { Row, Col } from "react-bootstrap";
import MovieCard from "../../peliculas/Movie.Item";

const PeliculaSection = ({ peliculas, onDeleteFilm, onEditFilm }) => {
  
  if (!peliculas) {
    return <div className="text-white">Cargando películas...</div>;
  }
  // Verifico que peliculas reciba un arreglo de peliculas del back , si no es un arreglo returno un mensaje de error y si recibe un erreglo lo mapeo
  if (!Array.isArray(peliculas)) {
    return (
      <div className="text-white text-center py-5">
        <h3>Error al cargar películas</h3>
        <p>Intenta recargar la página</p>
      </div>
    );
  }
  // Verifico si el arreglo de peliculas que resibe del back contenga peliculas, si no hay peliculas muestro un mensaje
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
      <h2 className="text-white mb-4">🎬 Cartelera de Películas</h2>
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