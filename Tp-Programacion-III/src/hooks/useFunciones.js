import { useState } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const useFunction = () => {
  const [funciones, setFunciones] = useState([]);
  const [editFuncion, setEditFuncion] = useState(null);

  const handleAddFunction = async (newFuncion) => {
    if (editFuncion) {
      setFunciones((prev) =>
        prev.map((f) =>
          f.id === editFuncion.id ? { ...editFuncion, ...newFuncion } : f
        )
      );
      setEditFuncion(null);
      toast.success("Función editada correctamente");
    } else {
      // Crear función en backend
      const token = localStorage.getItem("token");
      console.log("Función que voy a enviar al backend:", newFuncion);
      console.log("Token:", token);
      const res = await fetch("http://localhost:3000/api/funcion", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-token": token },
        body: JSON.stringify(newFuncion),
      });

      if (res.ok) {
        const createdFuncion = await res.json();
        setFunciones((prev) => [...prev, createdFuncion]);
        toast.success("Función agregada correctamente");
      } else {
        toast.error("No se pudo agregar la función");
      }
    }
  };

  const handleDeleteFunction = (id) => {
    setFunciones((prev) => prev.filter((f) => f.id !== id));
    toast.success("Función eliminada correctamente");
  };

  const handleEditFunction = (funcion) => {
    setEditFuncion(funcion);
  };

  return {
    funciones,
    handleAddFunction,
    handleDeleteFunction,
    handleEditFunction,
    editFuncion,
    setEditFuncion,
  };
};

export default useFunction;
