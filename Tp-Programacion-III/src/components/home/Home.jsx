import { Container, Row, Col } from "react-bootstrap"
import { Routes, Route } from "react-router-dom"

import Navbar from "../navbar/Navbar"
import PeliculaSection from "../dashboard/sections/PeliculaSection"
import EditProfile from "../profile/EditProfile"
import MovieSearch from "../peliculas/MovieSearch"
import HistorialReservas from "../reservas/HistorialReservas"
import NewReserva from "../reservas/NewReserva"
//importo los hooks de peliculas y reservas
import useReservas from "../../hooks/useReservas"
// import useFunciones from "../../hooks/useFunciones"
import useMovieSearch from "../../hooks/useMovieSearch"
import usePeliculasPublicas from "../../hooks/usePeliculasPublicas"

const Home = ({ onLogOut }) => {
    const {
        peliculas,
    } = usePeliculasPublicas();

    const {
        reservas, handleAddReserva, handleCancelReserva,
    } = useReservas();

    // const{
    //     funciones
    // } = useFunciones();

    const { filteredPeliculas, handleSearchChange } = useMovieSearch(peliculas);

    return (
        <div className="min-vh-100 bg-dark text-white">

            <Navbar onLogOut={onLogOut} />
            <Container fluid className="py-4 bg-dark min-vh-100">
                {/*Rutas Relativas a Home*/}
                <Routes>
                    <Route index element={
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="text-white mb-0">🎬 Cartelera de Películas</h2>
                                <MovieSearch onSearchChange={handleSearchChange} />
                            </div>
                            <PeliculaSection peliculas={filteredPeliculas} />
                        </div>
                    } />
                    {/*Perfil*/}
                    <Route path='perfil' element={<EditProfile />} />
                    {/*Historial de Reservas*/}
                    <Route path="historial-reservas" element={<HistorialReservas reservas={reservas} peliculas={peliculas} onCancelReserva={handleCancelReserva} />} />
                    <Route path="add-reserva" element={<NewReserva peliculas={peliculas} onAddReserva={handleAddReserva} />} />
                </Routes>
            </Container>
        </div>
    )
}
export default Home;