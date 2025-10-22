import { useState } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const useSala = () => {
    const [salas, setSalas] = useState([]);
    const [editSala, setEditSala] = useState(null);


    const handleAddSala = (newSala) => {
        if (editSala) {
          setSalas((prev) =>
            prev.map((s) => (s.id === editSala.id ? { ...editSala, ...newSala } : s))
          );
          setEditSala(null);
          toast.success("Sala editada correctamente");
        } else {
          setSalas((prev) => [...prev, { id: prev.length + 1, ...newSala }]);
          toast.success("Sala agregada correctamente");
        }

      };

    const handleDeleteSala = (id) => {
        setSalas((prev) => prev.filter((s) => s.id !== id));
        toast.success("Sala eliminada correctamente");
    };

    const handleEditSala = (sala) => {
        setEditSala(sala);
 
    };

    return{
        salas,
        handleAddSala,
        handleDeleteSala,
        handleEditSala,
        editSala,
        setEditSala,
    }
}

export default useSala;