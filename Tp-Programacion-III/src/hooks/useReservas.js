import { useState } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const useReservas = () => {
    const [reservas, setReservas] = useState([]);


    const handleAddReserva = (nuevaReserva) => {
        setReservas((prev) => [...prev, nuevaReserva]);
        toast.success("Reserva agregada correctamente");

    };

    const handleCancelReserva = (id) => {
        setReservas((prev) => prev.filter((r) => r.id !== id));
        toast.success("Reserva cancelada correctamente");
    }

    return{
        reservas,
        handleAddReserva,
        handleCancelReserva,
    }
}

export default useReservas;