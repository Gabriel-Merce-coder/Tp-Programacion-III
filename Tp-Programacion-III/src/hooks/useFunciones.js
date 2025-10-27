import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useFunction = () => {
  const [funciones, setFunciones] = useState([]);
  const [editFuncion, setEditFuncion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
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

  const handleAddFunction = async (newFuncion) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No hay token, inicia sesión como administrador");
      return;
    }

    try {
      if (editFuncion) {
       
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

  
  const toggleEstadoFuncion = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/api/funcion/${id}`, {
        method: "PATCH",
        headers: {
          "x-token": token,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al cambiar el estado");

      setFunciones((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, estado: data.newStatus } : f
        )
      );

      
      return { 
        success: true, 
        message: data.message || "Estado actualizado correctamente" 
      };
      
    } catch (error) {
      console.error("Error al cambiar estado de la función:", error);
     
      return { 
        success: false, 
        message: error.message || "Error al cambiar el estado de la función" 
      };
    }
  };

  const handleEditFunction = (funcion) => {
    setEditFuncion(funcion);
  };

  return {
    funciones,
    loading,
    error,
    editFuncion,
    handleAddFunction,
    toggleEstadoFuncion,
    handleEditFunction,
    setEditFuncion,
  };
};

export default useFunction;