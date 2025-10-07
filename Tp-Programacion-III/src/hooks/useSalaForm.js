import { useState, useRef } from "react";

const useSalaForm = () =>{
    const [tipo_sala, setTipo_Sala] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [estado, setEstado] = useState(true);
    const [errores, setErrores] = useState({
        tipo_sala: "",
        capacidad: ""
    });

    const tipo_salaRef = useRef(null);
    const capacidadRef = useRef(null);

    const handleChangeTipo_Sala = (e) =>{
        setTipo_Sala(e.target.value)
        if (errores.tipo_sala) {
            setErrores({...errores, tipo_sala: ""});
        }
    }

    const handleChangeCapacidad = (e) =>{
        setCapacidad(e.target.value)
        if (errores.capacidad) {
            setErrores({...errores, capacidad: ""});
        }
    }

    const handleChangeEstado = (e) =>{
        setEstado(e.target.checked);
    }

    return{
        tipo_sala,
        capacidad,
        estado,
        errores,
        setTipo_Sala,
        setCapacidad,
        setErrores,
        tipo_salaRef,
        capacidadRef,
        handleChangeTipo_Sala,
        handleChangeCapacidad,
        handleChangeEstado
    }
}
export default useSalaForm;