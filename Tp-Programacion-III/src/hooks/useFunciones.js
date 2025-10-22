import { useState } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const useFunction = () =>{
    const [funciones, setFunciones] = useState([]);
    const [editFuncion, setEditFuncion] = useState(null);


    const handleAddFunction = (newFuncion) => {
    if (editFuncion) {
      setFunciones((prev) =>
        prev.map((f) =>
          f.id === editFuncion.id ? { ...editFuncion, ...newFuncion } : f
        )
      );
      setEditFuncion(null);
      toast.success("Función editada correctamente");
    } else {
      setFunciones((prev) => [...prev, { id: prev.length + 1, ...newFuncion }]);
      toast.success("Función agregada correctamente");
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
    }
}

export default useFunction;