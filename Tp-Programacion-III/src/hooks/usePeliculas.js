import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
const usePeliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [editFilm, setEditFilm] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch("http://localhost:3000/api/pelicula", {
      headers: { 'x-token': token }
    })
      .then(res => res.json())
      .then(data => setPeliculas(data))
      .catch(() => {
        toast.error("Error al cargar películas");
        setPeliculas([]);
      })
  }, []);
  const handleAddFilm = (newFilm) => {
    if (editFilm) {
      setPeliculas(prev => prev.map(p => p.id === editFilm.id ? newFilm : p));
      setEditFilm(null);
      toast.success("Película editada");
    } else {
      setPeliculas(prev => [...prev, { id: prev.length + 1, ...newFilm }]);
      toast.success("Película agregada");
    }
  };

  const handleDeleteFilm = (id) => {
    setPeliculas(prev => prev.filter(p => p.id !== id));
    toast.success("Película eliminada");
  };

  const handleEditFilm = (film) => {
    setEditFilm(film);
  };

  return {
    peliculas,
    handleAddFilm,
    handleDeleteFilm,
    handleEditFilm,
    editFilm,
    setEditFilm,
  }
}

export default usePeliculas;