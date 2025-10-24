// import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//componentes
import NewFilm from "../peliculas/NewFilm";
import NewFuncion from "../funciones/NewFuncion";
import NewSala from "../salas/NewSala";
import Navbar from "../navbar/Navbar";
import NewReserva from "../reservas/NewReserva";
import HistorialReservas from "../reservas/HistorialReservas"
import EditProfile from "../profile/EditProfile";
import PageNotFound from "../pageNotFound/PageNotFound";

//secciones
import PeliculaSection from "../dashboard/sections/PeliculaSection";
import FunctionSection from "../dashboard/sections/FunctionSection";
import SalaSection from "../dashboard/sections/SalaSection";
import ReservaSection from "../dashboard/sections/ReservaSection";
import UserSection from "../dashboard/sections/UserSection";

//hooks
import usePeliculas from "../../hooks/usePeliculas"
import useFuncion from "../../hooks/useFunciones";
import useSala from "../../hooks/useSala";
import useReservas from "../../hooks/useReservas";
const Dashboard = ({ onLogOut }) => {
  const navigate = useNavigate();
  // usamos los hooks personalizados
  const {
    peliculas,
    handleAddFilm,
    handleDeleteFilm,
    handleEditFilm,
    editFilm,
    // setEditFilm,
  } = usePeliculas();

  const {
    funciones,
    handleAddFunction,
    handleDeleteFunction,
    handleEditFunction,
    editFuncion,
    // setEditFuncion,
  } = useFuncion();

  const {
    salas,
    handleAddSala,
    handleDeleteSala,
    handleEditSala,
    editSala,
    // setEditSala,
  } = useSala();

  const {
    reservas,
    // handleAddReserva,
    handleCancelReserva,
  } = useReservas();

  const handleNavigateToFilmEdit = (film) => {
    handleEditFilm(film);
    navigate(`edit-movie/${film.id}`);
  }
  const handleNavigateToFuncionEdit = (funcion) => {
    handleEditFunction(funcion);
    navigate(`edit-function/${funcion.id}`);
  }
  const handleNavigateToSalaEdit = (sala) => {
    handleEditSala(sala);
    navigate(`edit-sala/${sala.id}`);
  }
  return (
    <div className="min-vh-100 bg-dark text-white">
      <Navbar onLogOut={onLogOut} />


      <Container fluid className="py-4 bg-dark min-vh-100">
        <Routes>

          {/* Perfil */}
          <Route path="perfil" element={<EditProfile />} />

          {/* Rutas Relativas a Dashboard */}
          <Route
            index
            element={
              <>
                <PeliculaSection
                  peliculas={peliculas}
                  onDeleteFilm={handleDeleteFilm}
                  onEditFilm={handleNavigateToFilmEdit}
                />

                <FunctionSection
                  funciones={funciones}
                  peliculas={peliculas}
                  onDeleteFunction={handleDeleteFunction}
                  onEditFunction={handleNavigateToFuncionEdit}
                />

                <SalaSection
                  salas={salas}
                  onDeleteSala={handleDeleteSala}
                  onEditSala={handleNavigateToSalaEdit}
                />

                <UserSection />
              </>
            }
          />

          {/* Formularios */}
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

          {/* Historial */}
          <Route
            path="historial-reservas"
            element={
              <HistorialReservas
                reservas={reservas}
                peliculas={peliculas}
                funciones={funciones}
                onCancelReserva={handleCancelReserva}
              />
            }
          />

          {/* Editar */}
          <Route
            path="edit-movie/:id"
            element={<NewFilm onFilmAdd={handleAddFilm} editFilm={editFilm} />}
          />
          <Route
            path="edit-function/:id"
            element={
              <NewFuncion
                onFuncionAdd={handleAddFunction}
                editFuncion={editFuncion}
              />
            }
          />
          <Route
            path="edit-sala/:id"
            element={<NewSala onSalaAdd={handleAddSala} editSala={editSala} />}
          />
          {/*Perfil*/}

          <Route
            path='perfil'
            element={<EditProfile />}
          />
          {/* Pagina no encontrada */}
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </Container>
    </div>
  );
};
export default Dashboard;
