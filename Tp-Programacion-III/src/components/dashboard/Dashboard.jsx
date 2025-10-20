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
import "react-toastify/dist/ReactToastify.css";

// CAMBIO JULIAN: nuevos imports para reservas
import NewReserva from "../reservas/NewReserva";
import ReservaItem from "../reservaItem/ReservaItem";
// FIN CAMBIO JULIAN

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

  // CAMBIO JULIAN: nuevas reservas
  const [reservas, setReservas] = useState([]);

  const handleAddReserva = (nuevaReserva) => {
    setReservas((prev) => [...prev, nuevaReserva]);
    toast.success("Reserva agregada correctamente");
  };
  // FIN CAMBIO JULIAN

  // CAMBIO JULIAN: estados para modo edición
  const [editFilm, setEditFilm] = useState(null);
  const [editFuncion, setEditFuncion] = useState(null);
  const [editSala, setEditSala] = useState(null);
  // FIN CAMBIO JULIAN

  const navigate = useNavigate();

  // CAMBIO JULIAN: agregar o editar película
  const handleAddFilm = (newFilm) => {
    if (editFilm) {
      setPeliculas((prev) =>
        prev.map((p) => (p.id === editFilm.id ? { ...editFilm, ...newFilm } : p))
      );
      setEditFilm(null);
      toast.success("Película editada correctamente");
    } else {
      setPeliculas((prev) => [...prev, { id: prev.length + 1, ...newFilm }]);
      toast.success("Película agregada correctamente");
    }
    navigate("/home");
  };
  // FIN CAMBIO JULIAN

  // CAMBIO JULIAN: agregar o editar función
  const handleAddFunction = (newFuncion) => {
    if (editFuncion) {
      setFunciones((prev) =>
        prev.map((f) =>
          f.id === editFuncion.id ? { ...editFuncion, ...newFuncion } : f
        )
      );
      setEditFuncion(null);
      toast.success("Función editada correctamente");
    } else {
      setFunciones((prev) => [...prev, { id: prev.length + 1, ...newFuncion }]);
      toast.success("Función agregada correctamente");
    }
    navigate("/home");
  };
  // FIN CAMBIO JULIAN

  // CAMBIO JULIAN: agregar o editar sala
  const handleAddSala = (newSala) => {
    if (editSala) {
      setSalas((prev) =>
        prev.map((s) => (s.id === editSala.id ? { ...editSala, ...newSala } : s))
      );
      setEditSala(null);
      toast.success("Sala editada correctamente");
    } else {
      setSalas((prev) => [...prev, { id: prev.length + 1, ...newSala }]);
      toast.success("Sala agregada correctamente");
    }
    navigate("/home");
  };
  // FIN CAMBIO JULIAN

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

  // CAMBIO JULIAN: eliminar película
  const handleDeleteFilm = (id) => {
    setPeliculas((prev) => prev.filter((p) => p.id !== id));
    toast.success("Película eliminada correctamente");
  };
  // FIN CAMBIO JULIAN

  // CAMBIO JULIAN: activar modo edición
  const handleEditFilm = (film) => {
    setEditFilm(film);
    navigate("/home/add-movie");
  };

  const handleEditFunction = (funcion) => {
    setEditFuncion(funcion);
    navigate("/home/add-function");
  };

  const handleEditSala = (sala) => {
    setEditSala(sala);
    navigate("/home/add-sala");
  };
  // FIN CAMBIO JULIAN

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
                      <MovieCard
                        movie={peli}
                        onDelete={() => handleDeleteFilm(peli.id)} // CAMBIO JULIAN
                        onEdit={() => handleEditFilm(peli)} // CAMBIO JULIAN
                      />
                    </Col>
                  ))}
                </Row>

                {/* Funciones */}
                <h2 className="text-white mt-5 mb-4">
                  🎟️ Funciones Disponibles
                </h2>
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
                          onEdit={() => handleEditFunction(funcion)} // CAMBIO JULIAN
                        />
                      </Col>
                    ))
                  ) : (
                    <p className="text-white">
                      No hay funciones agregadas todavía.
                    </p>
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
                          onEdit={() => handleEditSala(sala)} // editar sala
                        />
                      </Col>
                    ))
                  ) : (
                    <p className="text-white">
                      No hay salas agregadas todavía.
                    </p>
                  )}
                </Row>

                {/* /////////////////////////////////////////////////////////
                CAMBIO JULIAN: mostrar reservas actuales
                ///////////////////////////////////////////////////////// */}
                <h2 className="text-white mt-5 mb-4">📋 Reservas actuales</h2>
                <Row>
                  {reservas.length > 0 ? (
                    reservas.map((reserva) => {
                      const peli = peliculas.find(
                        (p) => p.id === reserva.peliculaId
                      );
                      const funcion = funciones.find(
                        (f) => f.id === reserva.funcionId
                      );

                      return (
                        <Col
                          key={reserva.id}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          className="mb-4"
                        >
                          <ReservaItem
                            reserva={reserva}
                            pelicula={peli}
                            funcion={funcion}
                            onCancel={() => {
                              setReservas((prev) => prev.filter((r) => r.id !== reserva.id));
                              toast.success("Reserva cancelada correctamente"); //CAMBIO JULIAN: notificación al cancelar
                            }}
                          />
                        </Col>
                      );
                    })
                  ) : (
                    <p className="text-white">
                      No hay reservas registradas todavía.
                    </p>
                  )}
                </Row>
                {/* FIN CAMBIO JULIAN */}
              </div>
            }
          />

          {/* CAMBIO JULIAN: rutas para edición */}
          <Route
            path="add-movie"
            element={<NewFilm onFilmAdd={handleAddFilm} editFilm={editFilm} />}
          />

          <Route
            path="add-function"
            element={
              <NewFuncion
                onFuncionAdd={handleAddFunction}
                editFuncion={editFuncion}
              />
            }
          />

          <Route
            path="add-sala"
            element={<NewSala onSalaAdd={handleAddSala} editSala={editSala} />}
          />

          {/* CAMBIO JULIAN: nueva ruta para reservas */}
          <Route
            path="add-reserva"
            element={
              <NewReserva
                peliculas={peliculas}
                funciones={funciones}
                onAddReserva={handleAddReserva}
              />
            }
          />
          {/* FIN CAMBIO JULIAN */}
        </Routes>
      </Container>
    </div>
  );
};

export default Dashboard;
