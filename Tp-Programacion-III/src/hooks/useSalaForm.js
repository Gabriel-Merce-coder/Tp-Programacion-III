import { useState, useRef } from "react";

const useSalaForm = () => {
  const [numeroSala, setNumeroSala] = useState("");
  const [tipoSala, setTipoSala] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [estado, setEstado] = useState(true);

  const [errores, setErrores] = useState({
    numeroSala: "",
    tipoSala: "",
    capacidad: "",
  });

  const numeroSalaRef = useRef(null);
  const tipoSalaRef = useRef(null);
  const capacidadRef = useRef(null);

  const handleChangeNumeroSala = (e) => {
    setNumeroSala(e.target.value);
    if (errores.numeroSala) {
      setErrores({ ...errores, numeroSala: "" });
    }
  };

  const handleChangeTipoSala = (e) => {
    setTipoSala(e.target.value);
    if (errores.tipoSala) {
      setErrores({ ...errores, tipoSala: "" });
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
    numeroSala,
    tipoSala,
    capacidad,
    estado,
    errores,
    setNumeroSala,
    setTipoSala,
    setCapacidad,
    setEstado,
    setErrores,
    numeroSalaRef,
    tipoSalaRef,
    capacidadRef,
    handleChangeNumeroSala,
    handleChangeTipoSala,
    handleChangeCapacidad,
    handleChangeEstado,
  };
};

export default useSalaForm;

