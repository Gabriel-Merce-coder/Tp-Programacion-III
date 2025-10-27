import { useState, useRef } from "react";

const useFilmForm = () => {
  const [titulo, setTitulo] = useState("");
  const [duracion, setDuracion] = useState("");
  const [genero, setGenero] = useState("");
  const [reparto, setReparto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errores, setErrores] = useState({
    titulo: "",
    duracion: "",
    genero: "",
    reparto: "",
    descripcion: "",
    calificacion: "",
    imageUrl: ""
  });

  const tituloRef = useRef(null);
  const duracionRef = useRef(null);
  const generoRef = useRef(null);
  const repartoRef = useRef(null);
  const descripcionRef = useRef(null);
  const calificacionRef = useRef(null);
  const imageUrlRef = useRef(null);

  const handleChangeTitulo = (e) => {
    setTitulo(e.target.value)
    if (errores.titulo) {
      setErrores({ ...errores, titulo: "" });
    }
  }

  const handleChangeDuracion = (e) => {
    setDuracion(e.target.value)
    if (errores.duracion) {
      setErrores({ ...errores, duracion: "" });
    }
  }

  const handleChangeGenero = (e) => {
    setGenero(e.target.value)
    if (errores.genero) {
      setErrores({ ...errores, genero: "" });
    }
  }

  const handleChangeReparto = (e) => {
    setReparto(e.target.value)
    if (errores.reparto) {
      setErrores({ ...errores, reparto: "" });
    }
  }

  const handleChangeDescripcion = (e) => {
    setDescripcion(e.target.value)
    if (errores.descripcion) {
      setErrores({ ...errores, descripcion: "" });
    }
  }

  const handleChangeCalificacion = (e) => {
    setCalificacion(e.target.value)
    if (errores.calificacion) {
      setErrores({ ...errores, calificacion: "" });
    }
  }

  const handleChangeImageUrl = (e) => {
    setImageUrl(e.target.value)
    if (errores.imageUrl) {
      setErrores({ ...errores, imageUrl: "" });
    }
  }

  return {
    titulo,
    duracion,
    genero,
    reparto,
    descripcion,
    calificacion,
    imageUrl,
    errores,

    tituloRef,
    duracionRef,
    generoRef,
    repartoRef,
    descripcionRef,
    calificacionRef,
    imageUrlRef,

    handleChangeTitulo,
    handleChangeDuracion,
    handleChangeGenero,
    handleChangeReparto,
    handleChangeDescripcion,
    handleChangeCalificacion,
    handleChangeImageUrl,

    setTitulo,
    setDuracion,
    setGenero,
    setReparto,
    setDescripcion,
    setCalificacion,
    setImageUrl,
    setErrores
  };
};

export default useFilmForm;