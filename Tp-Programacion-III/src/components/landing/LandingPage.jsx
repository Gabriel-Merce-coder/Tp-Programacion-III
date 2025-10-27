
import PublicNavbar from '../navbar/PublicNavbar';
import PeliculaSection from '../dashboard/sections/PeliculaSection';
import MovieSearch from '../peliculas/MovieSearch';
import useMovieSearch from '../../hooks/useMovieSearch';
import usePeliculasPublicas from '../../hooks/usePeliculasPublicas';
import './LandingPage.css';


const LandingPage = () => {
  const { peliculas } = usePeliculasPublicas();
  const { filteredPeliculas, handleSearchChange } = useMovieSearch(peliculas);

  return (
    <>
      <PublicNavbar />
      <div
        className="landing-container"
        style={{
          backgroundImage: "url('https://wallpapers.com/images/featured/imagenes-de-cine-itv2fyqylv6mex00.jpg')",
        }}
      >
        <div className="landing-overlay">
          <h1 className="landing-title">Bienvenido a CineFlix</h1>
          <p className="landing-subtitle">Inicia sesión para realizar reservas</p>
          <div className="landing-search">
            <MovieSearch onSearchChange={handleSearchChange} />
          </div>
        </div>

        <div className="landing-peliculas">
          <div className="container">
            <PeliculaSection peliculas={filteredPeliculas} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
