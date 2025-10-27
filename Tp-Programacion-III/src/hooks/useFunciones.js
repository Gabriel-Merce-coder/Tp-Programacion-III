import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useFunction = () => {
  const [funciones, setFunciones] = useState([]);
  const [editFuncion, setEditFuncion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar funciones desde el backend
  useEffect(() => {
    const fetchFunciones = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/funcion", {
          headers: {
            "Content-Type": "application/json",
            "x-token": token,
          },
        });

        if (!res.ok) throw new Error("Error al cargar las funciones");

        const data = await res.json();
        setFunciones(data.funciones || []);
      } catch (err) {
        setError(err.message);
        setFunciones([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFunciones();
  }, []);

  // Crear o editar función
  const handleAddFunction = async (newFuncion) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No hay token, inicia sesión como administrador");
      return;
    }

    try {
      if (editFuncion) {
        // Editar función existente
        const res = await fetch(
          `http://localhost:3000/api/funcion/${editFuncion.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-token": token,
            },
            body: JSON.stringify(newFuncion),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setFunciones((prev) =>
            prev.map((f) =>
              f.id === editFuncion.id ? data.updateFuncion : f
            )
          );
          setEditFuncion(null);
          toast.success("Función editada correctamente");
        } else {
          toast.error(data.error || "Error al editar la función");
        }
      } else {
        // Crear nueva función
        const res = await fetch("http://localhost:3000/api/funcion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": token,
          },
          body: JSON.stringify(newFuncion),
        });

        const data = await res.json();

        if (res.ok) {
          setFunciones((prev) => [...prev, data.funcion]);
          toast.success("Función agregada correctamente");
        } else {
          toast.error(data.error || "Error al agregar la función");
        }
      }
    } catch (error) {
      console.error("Error en handleAddFunction:", error);
      toast.error("Error de conexión con el servidor");
    }
  };

  // Eliminar función
  const handleDeleteFunction = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/api/funcion/${id}`, {
        method: "DELETE",
        headers: {
          "x-token": token,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar la función");

      setFunciones((prev) => prev.filter((f) => f.id !== id));
      toast.success("Función eliminada correctamente");
    } catch (error) {
      console.error("Error en handleDeleteFunction:", error);
      toast.error("Error al eliminar la función");
    }
  };

  // Establecer función en modo edición
  const handleEditFunction = (funcion) => {
    setEditFuncion(funcion);
  };

  return {
    funciones,
    loading,
    error,
    editFuncion,
    handleAddFunction,
    handleDeleteFunction,
    handleEditFunction,
    setEditFuncion,
  };
};

export default useFunction;
