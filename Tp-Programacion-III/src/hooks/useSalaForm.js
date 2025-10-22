import { useState, useRef } from "react";

const useSalaForm = () => {
  const [numero, setNumero] = useState("");
  const [tipo_sala, setTipo_Sala] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [estado, setEstado] = useState(true);

  const [errores, setErrores] = useState({
    numero: "",
    tipo_sala: "",
    capacidad: "",
  });

  const numeroRef = useRef(null);
  const tipo_salaRef = useRef(null);
  const capacidadRef = useRef(null);

  const handleChangeNumero = (e) => {
    setNumero(e.target.value);
    if (errores.numero) {
      setErrores({ ...errores, numero: "" });
    }
  };

  const handleChangeTipo_Sala = (e) => {
    setTipo_Sala(e.target.value);
    if (errores.tipo_sala) {
      setErrores({ ...errores, tipo_sala: "" });
    }
  };

  const handleChangeCapacidad = (e) => {
    setCapacidad(e.target.value);
    if (errores.capacidad) {
      setErrores({ ...errores, capacidad: "" });
    }
  };

  const handleChangeEstado = (e) => {
    setEstado(e.target.checked);
  };

  return {
    numero,
    tipo_sala,
    capacidad,
    estado,
    errores,
    setNumero,
    setTipo_Sala,
    setCapacidad,
    setEstado,
    setErrores,
    numeroRef,
    tipo_salaRef,
    capacidadRef,
    handleChangeNumero,
    handleChangeTipo_Sala,
    handleChangeCapacidad,
    handleChangeEstado,
  };
};

export default useSalaForm;
