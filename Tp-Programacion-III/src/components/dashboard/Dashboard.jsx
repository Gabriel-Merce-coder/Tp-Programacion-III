import { useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import MovieCard from "../movieItem/Movie.Item";
import NewFilm from "../newFilm/NewFilm";
import NewFuncion from "../newFuncion/NewFuncion";
import NewSala from "../newSala/NewSala" 
import Navbar from "../navbar/Navbar";

const Dashboard = ({ onLogOut }) => {
  const [peliculas, setPeliculas] = useState([
    {
      id: 1,
      titulo: "El Padrino",
      duracion: 175,
      genero: "Drama, Crimen",
      reparto: "Marlon Brando, Al Pacino, James Caan",
      descripcion:
        "La historia de la familia Corleone, una de las más poderosas familias mafiosas de Nueva York.",
      calificacion: 9.2,
      imageUrl:
        "https://tse2.mm.bing.net/th/id/OIP.I0k4irD9LClGqrM7TkwHrAHaKg?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ]);

  const [funciones, setFunciones] = useState([]);
  const [salas, setSalas] = useState([]); 

  const navigate = useNavigate();

  const handleAddFilm = (newFilm) => {
    setPeliculas((prev) => [...prev, { id: prev.length + 1, ...newFilm }]);
    navigate("/home");
  };

  const handleAddFunction = (newFuncion) => {
    setFunciones((prev) => [...prev, { id: prev.length + 1, ...newFuncion }]);
    navigate("/home");
  };

  const handleAddSala = (newSala) => {
    setSalas((prev) => [...prev, { id: prev.length + 1, ...newSala }]);
    navigate("/home");
  };

  return (
    <div className="min-vh-100 bg-dark text-white">
      {/* Navbar */}
      <Navbar onLogOut={onLogOut} />

      {/* Contenido principal */}
      <Container fluid className="py-4 bg-dark min-vh-100">
        <Routes>
          {/* Cartelera de películas */}
          <Route
            index
            element={
              <div>
                <h2 className="text-white mb-4">🎬 Cartelera de Películas</h2>
                <Row>
                  {peliculas.map((peli) => (
                    <Col
                      key={peli.id}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      xl={2}
                      className="mb-4"
                    >
                      <MovieCard movie={peli} />
                    </Col>
                  ))}
                </Row>
              </div>
            }
          />

          {/* ➕ Agregar Película */}
          <Route
            path="add-movie"
            element={
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="text-white">➕ Agregar Película</h2>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate("/home")}
                  >
                    🔙 Volver al Catálogo
                  </Button>
                </div>
                <NewFilm onFilmAdd={handleAddFilm} />
              </div>
            }
          />

          {/* 🎬 Agregar Función */}
          <Route
            path="add-function"
            element={
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="text-white">🎬 Agregar Función</h2>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate("/home")}
                  >
                    🔙 Volver al Catálogo
                  </Button>
                </div>
                <NewFuncion onFuncionAdd={handleAddFunction} />
              </div>
            }
          />

          {/* 🏛️ Agregar Sala */}
          <Route
            path="add-sala"
            element={
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="text-white">🏛️ Agregar Sala</h2>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate("/home")}
                  >
                    🔙 Volver al Catálogo
                  </Button>
                </div>
                <NewSala onSalaAdd={handleAddSala} />
              </div>
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default Dashboard;
