import PublicNavbar from '../navbar/PublicNavbar';
import PeliculaSection from '../dashboard/sections/PeliculaSection';
import MovieSearch from '../peliculas/MovieSearch';
import usePeliculas from '../../hooks/usePeliculas';
import useMovieSearch from '../../hooks/useMovieSearch';

const LandingPage = () => {
  const { peliculas } = usePeliculas();
  const { filteredPeliculas, handleSearchChange } = useMovieSearch(peliculas);

  return (
    <>
      <PublicNavbar />
      <div
        className="min-vh-100 bg-dark text-white"
        style={{
          backgroundImage: "url('https://wallpapers.com/images/featured/imagenes-de-cine-itv2fyqylv6mex00.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="d-flex flex-column justify-content-center align-items-center text-center py-5" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <h1 className="display-4 fw-bold mb-3">Bienvenido a Nuestro Cine</h1>
          <p className="lead mb-4">Inicia sesión para realizar reservas</p>
          <div className="mt-3">
            <MovieSearch onSearchChange={handleSearchChange} />
          </div>
        </div>

        {/* Sección de Películas */}
        <div style={{ backgroundColor: 'rgba(0,0,0,0.9)' }} className="py-5">
          <div className="container">
            <PeliculaSection peliculas={filteredPeliculas} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;