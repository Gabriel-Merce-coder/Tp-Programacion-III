import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

const useSala = () => {
  const [salas, setSalas] = useState([]);

  //  GET obtener salas
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/sala", {
      headers: { "x-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🎬 Salas cargadas:", data);
        setSalas(data.salas || []);
      })
      .catch((error) => {
        console.error("❌ Error al cargar salas:", error);
        toast.error("Error al cargar salas");
        setSalas([]);
      });
  }, []);

  // POST  agregar sala
  const handleAddSala = async (newSala) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/api/sala", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify(newSala),
      });

      const data = await res.json();

      if (res.ok) {
        setSalas((prev) => [...prev, data.sala]);
        toast.success(data.message || "Sala creada correctamente");
      } else {
        toast.error(data.message || "Error al crear la sala");
      }
    } catch (error) {
      console.error("❌ Error al crear sala:", error);
      toast.error("Error de conexión con el servidor");
    }
  };

  //  PATCH cambiar estado (borrado lógico)
  const toggleEstadoSala = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/api/sala/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
      });

      const data = await res.json();

      if (res.ok) {

        setSalas((prev) =>
          prev.map((sala) =>
            sala.id === id ? { ...sala, estado: !sala.estado } : sala
          )
        );

        return { success: true, message: data.message || "Estado actualizado correctamente" };
      } else {
        return { success: false, message: data.message || "Error al actualizar la sala" };
      }
    } catch (error) {
      console.error("❌ Error al cambiar estado de sala:", error);
      return { success: false, message: "Error de conexión con el servidor" };
    }
  };

  return { salas, handleAddSala, toggleEstadoSala };
};

export default useSala;

