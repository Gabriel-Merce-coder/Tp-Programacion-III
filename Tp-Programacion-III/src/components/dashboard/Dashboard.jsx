import { useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import MovieCard from "../movieItem/Movie.Item";
import FuncionCard from "../funcionItem/FuncionItem";
import SalaCard from "../salaItem/SalaItem"; 
import NewFilm from "../newFilm/NewFilm";
import NewFuncion from "../newFuncion/NewFuncion";
import NewSala from "../newSala/NewSala";
import Navbar from "../navbar/Navbar";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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

  // Agregar Película
  const handleAddFilm = (newFilm) => {
    setPeliculas((prev) => [...prev, { id: prev.length + 1, ...newFilm }]);
    navigate("/home");
  };

  // Agregar Función
  const handleAddFunction = (newFuncion) => {
    setFunciones((prev) => [...prev, { id: prev.length + 1, ...newFuncion }]);

    navigate("/home");
  };

  // Agregar Sala
  const handleAddSala = (newSala) => {
    setSalas((prev) => [...prev, { id: prev.length + 1, ...newSala }]);
    navigate("/home");
  };

  // Eliminar Función
  const handleDeleteFunction = (id) => {
    setFunciones((prev) => prev.filter((f) => f.id !== id));
    toast.success("Función eliminada correctamente");
  };

  // Eliminar Sala
  const handleDeleteSala = (id) => {
    setSalas((prev) => prev.filter((s) => s.id !== id));
    toast.success("Sala eliminada correctamente");
  };

  return (
    <div className="min-vh-100 bg-dark text-white">
      <Navbar onLogOut={onLogOut} />

      <Container fluid className="py-4 bg-dark min-vh-100">
        <Routes>
          {/* Dashboard principal */}
          <Route
            index
            element={
              <div>
                {/* Películas */}
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

                {/* Funciones */}
                <h2 className="text-white mt-5 mb-4">🎟️ Funciones Disponibles</h2>
                <Row>
                  {funciones.length > 0 ? (
                    funciones.map((funcion) => (
                      <Col
                        key={funcion.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-4"
                      >
                        <FuncionCard
                          funcion={funcion}
                          peliculas={peliculas}
                          onDelete={() => handleDeleteFunction(funcion.id)}
                        />
                      </Col>
                    ))
                  ) : (
                    <p className="text-white">No hay funciones agregadas todavía.</p>
                  )}
                </Row>

                {/* Salas */}
                <h2 className="text-white mt-5 mb-4">🏛️ Salas Disponibles</h2>
                <Row>
                  {salas.length > 0 ? (
                    salas.map((sala) => (
                      <Col
                        key={sala.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-4"
                      >
                        <SalaCard
                          sala={sala}
                          onDelete={() => handleDeleteSala(sala.id)}
                        />
                      </Col>
                    ))
                  ) : (
                    <p className="text-white">No hay salas agregadas todavía.</p>
                  )}
                </Row>
              </div>
            }
          />

          {/* Agregar Película */}
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

          {/* Agregar Función */}
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

          {/* Agregar Sala */}
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
