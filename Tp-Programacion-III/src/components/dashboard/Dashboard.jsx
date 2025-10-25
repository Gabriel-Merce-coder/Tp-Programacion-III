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
import PageNotFound from "../ui/PageNotFound";
import MovieSearch from "../peliculas/MovieSearch";

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
import useMovieSearch from "../../hooks/useMovieSearch";


const Dashboard = ({ onLogOut }) => {

  const navigate = useNavigate();

  const {
    peliculas, handleAddFilm, handleEditFilm, editFilm, handleStatusChange, // setEditFilm,
  } = usePeliculas();

  const {
    funciones, handleAddFunction, handleDeleteFunction, handleEditFunction, editFuncion, // setEditFuncion,
  } = useFuncion();

  const {
    salas, handleAddSala, handleDeleteSala, handleEditSala, editSala, // setEditSala,
  } = useSala();

  const {
    reservas, handleCancelReserva, // handleAddReserva,
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

  const { filteredPeliculas, handleSearchChange } = useMovieSearch(peliculas);

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
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="text-white mb-0">🎬 Cartelera de Películas</h2>
                  <MovieSearch onSearchChange={handleSearchChange} />
                </div>
                <PeliculaSection
                  peliculas={filteredPeliculas}
                  onEditFilm={handleNavigateToFilmEdit}
                  onStatusChange={handleStatusChange}
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
          <Route path="add-movie" element={<NewFilm onFilmAdd={handleAddFilm} editFilm={editFilm} />} />
          <Route path="add-function" element={<NewFuncion onFuncionAdd={handleAddFunction} editFuncion={editFuncion} />} />
          <Route path="add-sala" element={<NewSala onSalaAdd={handleAddSala} editSala={editSala} />} />
          {/* Historial */}
          <Route path="historial-reservas" element={<HistorialReservas reservas={reservas} peliculas={peliculas} funciones={funciones} onCancelReserva={handleCancelReserva} />} />
          {/* Editar */}
          <Route path="edit-movie/:id" element={<NewFilm onFilmAdd={handleAddFilm} editFilm={editFilm} />} />
          <Route path="edit-function/:id" element={<NewFuncion onFuncionAdd={handleAddFunction} editFuncion={editFuncion} />} />
          <Route path="edit-sala/:id" element={<NewSala onSalaAdd={handleAddSala} editSala={editSala} />} />
          {/*Perfil*/}
          {/* Pagina no encontrada */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </div>
  );
};
export default Dashboard;
