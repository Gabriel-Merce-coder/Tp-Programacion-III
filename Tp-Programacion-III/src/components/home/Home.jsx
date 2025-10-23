import {Container, Row, Col}   from "react-bootstrap"
import {Routes, Route} from "react-router-dom" 
import Navbar from "../navbar/Navbar"
import PeliculaSection from "../dashboard/sections/PeliculaSection"
import EditProfile  from "../profile/EditProfile"
import HistorialReservas from "../reservas/HistorialReservas"
import NewReserva from "../reservas/NewReserva"
//importo los hooks de peliculas y reservas
import usePeliculas from "../../hooks/usePeliculas"
import useReservas from "../../hooks/useReservas"
import useFunciones from "../../hooks/useFunciones"
const Home = ({onLogOut}) => {
    const {
        peliculas,
        handleAddFilm,
        handleDeleteFilm,
        handleEditFilm,
        editFilm,
        setEditFilm,
    } = usePeliculas();

    const{
        reservas,
        handleAddReserva,
        handleCancelReserva,
    } = useReservas();
    const{
        funciones,
        handleAddFunction,
        handleDeleteFunction,
        handleEditFunction,
        editFuncion,
        setEditFuncion,
    } = useFunciones();

    return (
        <div className="min-vh-100 bg-dark text-white">
            <Navbar onLogOut={onLogOut} />
            <Container fluid className="py-4 bg-dark min-vh-100">
                {/*Rutas Relativas a Home*/}
                <Routes>
                    <Route
                        index
                        element={
                        <PeliculaSection
                        peliculas={peliculas}
                        onDeleteFilm={() => {}} // funcion vacia, es para que no tire error de prop requerida
                        onEditFilm={() => {}} // funcion vacia, es para que no tire error de prop requerida
                    />
                }
            />
                {/*Perfil*/}

                    <Route 
                        path='perfil'
                        element={<EditProfile />}
                    />
                {/*Historial de Reservas*/}
                    <Route 
                        path="historial-reservas"
                        element={
                            <HistorialReservas 
                                reservas={reservas}
                                peliculas={peliculas}
                                onCancelReserva={handleCancelReserva}                        
                            />
                        }
                    />
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
                </Routes>
            </Container>
        </div>
    )
}

export default Home;