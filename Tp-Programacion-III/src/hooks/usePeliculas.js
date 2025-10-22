import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const usePeliculas = () => {

  const [peliculas, setPeliculas] = useState([
    {
      id: 1,
      titulo: "El Padrino",
      duracion: 175,
      genero: "Drama, Crimen",
      reparto: "Marlon Brando, Al Pacino, James Caan",
      descripcion:
        "La historia de la familia Corleone, una de las más poderosas familias mafiosas de Nueva York.",
      calificacion: 9.2,
      imageUrl:
        "https://tse2.mm.bing.net/th/id/OIP.I0k4irD9LClGqrM7TkwHrAHaKg?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ]);
  const [editFilm, setEditFilm] = useState(null);
    // Agregar Peliculas
    const handleAddFilm = (newFilm) => {
      if (editFilm) {
        setPeliculas((prev) =>
          prev.map((p) => (p.id === editFilm.id ? { ...editFilm, ...newFilm } : p))
        );
        setEditFilm(null);
        toast.success("Película editada correctamente");
      } else {
        setPeliculas((prev) => [...prev, { id: prev.length + 1, ...newFilm }]);
        toast.success("Película agregada correctamente");
      }

    };
     // Eliminar Peliculas
    const handleDeleteFilm = (id) => {
        setPeliculas((prev) => prev.filter((p) => p.id !== id));
        toast.success("Película eliminada correctamente");
    };
    // Editar Peliculas
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