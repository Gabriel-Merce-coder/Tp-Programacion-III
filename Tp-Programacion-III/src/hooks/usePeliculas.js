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
        console.log("🎬 Películas cargadas desde backend:", data);
        console.log("🎬 IDs recibidos:", data.map((p) => p.id));
        setPeliculas(data);
        console.log("✅ Películas guardadas en estado:", data.map((p) => p.id));
      })
      .catch((error) => {
        console.error("❌ Error al cargar películas:", error);
        toast.error("Error al cargar películas");
        setPeliculas([]);
      });
  }, []);

  const handleAddFilm = async (newFilm) => {
    const token = localStorage.getItem("token");
    console.log("🎬 Película que voy a enviar al backend:", newFilm);
    console.log("🔑 Token:", token);

    // --- MODO EDICIÓN ---
    if (editFilm) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/pelicula/${editFilm.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-token": token,
            },
            body: JSON.stringify(newFilm),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const updated = data.updatePelicula || data; // 👈 extrae correctamente del backend
          console.log("✅ Película actualizada:", updated);

          setPeliculas((prev) =>
            prev.map((p) => (p.id === editFilm.id ? updated : p))
          );

          setEditFilm(null);
          toast.success("Película editada correctamente");
        } else {
          toast.error("Error al editar la película");
        }
      } catch (error) {
        console.error("❌ Error al editar:", error);
        toast.error("Error al conectar con el servidor");
      }
      return;
    }

    // --- MODO CREAR ---
    try {
      const res = await fetch("http://localhost:3000/api/pelicula", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify(newFilm),
      });

      if (res.ok) {
        const data = await res.json();
        const peliculaCreada = data.pelicula || data; // 👈 toma solo el objeto pelicula
        console.log("✅ Película creada en backend:", peliculaCreada);

        setPeliculas((prev) => [...prev, peliculaCreada]);
        console.log("🎬 Estado actualizado con película:", peliculaCreada.id);

        toast.success("Película agregada correctamente");
      } else {
        toast.error("No se pudo agregar la película");
      }
    } catch (error) {
      console.error("❌ Error al agregar:", error);
      toast.error("Error al conectar con el servidor");
    }
  };

  const handleDeleteFilm = (id) => {
    console.log(`🗑️ Eliminando película con id: ${id}`);
    setPeliculas((prev) => prev.filter((p) => p.id !== id));
    toast.success("Película eliminada");
  };

  const handleEditFilm = (film) => {
    console.log("✏️ Editando película:", film);
    setEditFilm(film);
  };

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
    handleDeleteFilm,
    handleEditFilm,
    editFilm,
    setEditFilm,
    handleStatusChange,
  };
};

export default usePeliculas;

