import { useState, useRef } from "react";

const useFuncionForm = () => {
    const [precio, setPrecio] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [peliculaId, setPeliculaId] = useState("");
    const [salaId, setSalaId] = useState("");
    const [estado, setEstado] = useState(true);

    const [errores, setErrores] = useState({
        precio: "",
        fecha: "",
        hora: "",
        peliculaId: "",
        salaId: ""
    });

    const precioRef = useRef(null);
    const fechaRef = useRef(null);
    const horaRef = useRef(null);
    const peliculaIdRef = useRef(null);
    const salaIdRef = useRef(null);

    const handleChangePrecio = (e) => {
        setPrecio(e.target.value);
        if (errores.precio) {
            setErrores({ ...errores, precio: "" });
        }
    };

    const handleChangeFecha = (e) => {
        setFecha(e.target.value);
        if (errores.fecha) {
            setErrores({ ...errores, fecha: "" });
        }
    };

    const handleChangeHora = (e) => {
        setHora(e.target.value);
        if (errores.hora) {
            setErrores({ ...errores, hora: "" });
        }
    };

    const handleChangePeliculaId = (e) => {
        setPeliculaId(e.target.value);
        if (errores.peliculaId) {
            setErrores({ ...errores, peliculaId: "" });
        }
    };

    const handleChangeSalaId = (e) => {
        setSalaId(e.target.value);
        if (errores.salaId) {
            setErrores({ ...errores, salaId: "" });
        }
    };

    const handleChangeEstado = (e) => {
        setEstado(e.target.checked);
    };

    return {

        precio,
        fecha,
        hora,
        peliculaId,
        salaId,
        estado,
        errores,

        precioRef,
        fechaRef,
        horaRef,
        peliculaIdRef,
        salaIdRef,


        handleChangePrecio,
        handleChangeFecha,
        handleChangeHora,
        handleChangePeliculaId,
        handleChangeSalaId,
        handleChangeEstado,


        setPrecio,
        setFecha,
        setHora,
        setPeliculaId,
        setSalaId,
        setEstado,
        setErrores
    }
}

export default useFuncionForm;