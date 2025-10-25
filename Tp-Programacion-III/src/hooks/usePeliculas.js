import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

const usePeliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [editFilm, setEditFilm] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/pelicula", {
      headers: { "x-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🎬 Películas cargadas:", data);
        setPeliculas(data);
      })
      .catch((error) => {
        console.error("❌ Error al cargar películas:", error);
        toast.error("Error al cargar películas");
        setPeliculas([]);
      });
  }, []);

  
  const handleAddFilm = async (newFilm) => {
    const token = localStorage.getItem("token");

    if (editFilm) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/pelicula/${editFilm.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(newFilm),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const updated = data.updatePelicula || data;
          setPeliculas((prev) =>
            prev.map((p) => (p.id === editFilm.id ? updated : p))
          );
          setEditFilm(null);
          toast.success("Película editada correctamente");
        } else {
          const data = await res.json();
          toast.error(data.message || "Error al editar la película");
        }
      } catch (error) {
        console.error("❌ Error al editar:", error);
        toast.error("Error al conectar con el servidor");
      }
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/pelicula", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-token": token },
        body: JSON.stringify(newFilm),
      });

      if (res.ok) {
        const data = await res.json();
        const peliculaCreada = data.pelicula || data;
        setPeliculas((prev) => [...prev, peliculaCreada]);
        toast.success("Película agregada correctamente");
      } else {
        const data = await res.json();
        toast.error(data.message || "No se pudo agregar la película");
      }
    } catch (error) {
      console.error("❌ Error al agregar:", error);
      toast.error("Error al conectar con el servidor");
    }
  };

 
  const toggleStatus = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/api/pelicula/${id}/estado`, {
        method: "PATCH",
        headers: { "x-token": token ,
          'Content-Type': 'application/json'
        },
      });

      const data = await res.json();

      if (res.ok) {
        setPeliculas((prev) =>
          prev.map((p) => (p.id === id ? { ...p, estado: data.newStatus } : p))
        );
        toast.success(data.message);
      } else {
        toast.error(data.message || "No se pudo cambiar el estado");
      }
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error);
      toast.error("Error de conexión con el servidor");
    }
  };

  const handleEditFilm = (film) => setEditFilm(film);

  const handleStatusChange = async (id) => {

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/api/pelicula/${id}`, {
        method: 'PATCH',
        headers: {
          'x-token': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        const newStatus = data.newStatus;

        // Actualizar el estado local
        setPeliculas((prev) =>
          prev.map((p) => (p.id === id ? { ...p, estado: newStatus } : p))
        );

        toast.success(data.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || errorData.message || 'Error al actualizar el estado de la película');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error de conexión');
    }
  };

  return {
    peliculas,
    handleAddFilm,
    handleEditFilm,
    toggleStatus,
    editFilm,
    setEditFilm,
    handleStatusChange,
  };
};

export default usePeliculas;



