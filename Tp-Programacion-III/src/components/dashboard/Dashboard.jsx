import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";

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
import FuncionAdminSection from "../dashboard/sections/FunctionAdminSection";
import PeliculaSection from "../dashboard/sections/PeliculaSection";

import ReservaSection from "../dashboard/sections/ReservaSection";
import UserSection from "../dashboard/sections/UserSection";
import SalaAdminSection from "./sections/SalaAdminSection";

//hooks
import usePeliculas from "../../hooks/usePeliculas"
import useFuncion from "../../hooks/useFunciones";
import useSala from "../../hooks/useSala";
import useReservas from "../../hooks/useReservas";
import useMovieSearch from "../../hooks/useMovieSearch";


const Dashboard = ({ onLogOut }) => {

  const navigate = useNavigate();

  const {
    peliculas, handleAddFilm, handleEditFilm, editFilm, handleStatusChange, 
  } = usePeliculas();

  const {
    funciones, handleAddFunction,  handleEditFunction, editFuncion, 
  } = useFuncion();

  const {
    salas, handleAddSala, editSala, 
  } = useSala();

  const {
    reservas, handleCancelReserva, 
  } = useReservas();

  const handleNavigateToFilmEdit = (film) => {
    handleEditFilm(film);
    navigate(`edit-movie/${film.id}`);
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
          {/* Secciones de Administracion */}
          <Route path="view-users" element={<UserSection />} />
          <Route path="view-salas" element={<SalaAdminSection />} />
          <Route path="view-functions" element={<FuncionAdminSection  setEditFuncion={handleEditFunction}/>} />
          {/*Perfil*/}
          {/* Pagina no encontrada */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </div>
  );
};
export default Dashboard;
