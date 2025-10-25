// para mostrar peliculas en la pagina de inicio (landing page)
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const usePeliculasPublicas = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    // Fetch SIN token  para usuarios públicos
    fetch("http://localhost:3000/api/pelicula/public")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPeliculas(data);
        } else {
          toast.error("Error al cargar películas");
          setPeliculas([]);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error("Error de conexión");
        setPeliculas([]);
      });
  }, []);

  return { peliculas };
}

export default usePeliculasPublicas;