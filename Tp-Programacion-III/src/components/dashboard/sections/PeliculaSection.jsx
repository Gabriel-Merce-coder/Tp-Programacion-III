import { Row, Col, Container } from "react-bootstrap";
import MovieCard from "../../peliculas/Movie.Item";
const PeliculaSection = ({ peliculas, onDeleteFilm, onEditFilm }) => {
  return (
    <div>
      <h2 className="text-white mb-4">🎬 Cartelera de Películas</h2>
      <Row>
        {peliculas.map((peli) => (
          <Col key={peli.id} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4">
            <MovieCard
              movie={peli}
              onDelete={() => onDeleteFilm(peli.id)}
              onEdit={() => onEditFilm(peli)}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default PeliculaSection;