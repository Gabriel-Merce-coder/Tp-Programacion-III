import { useState } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const useReservas = () => {
    const [reservas, setReservas] = useState([]);


    const handleAddReserva = async (nuevaReserva) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3000/api/reserva', {
                method: 'POST',
                headers: {
                    'x-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaReserva)
            });

            if (!response.ok) {
                throw new Error('Error al crear la reserva');
            }

            const data = await response.json();
            setReservas((prev) => [...prev, data.reserva]);
            toast.success("Reserva creada correctamente");
        } catch (error) {
            console.error('Error:', error);
            toast.error("Error al crear la reserva: " + error.message);
        }
    };

    const handleCancelReserva = (id) => {
        setReservas((prev) => prev.filter((r) => r.id !== id));
        toast.success("Reserva cancelada correctamente");
    }

    return {
        reservas,
        handleAddReserva,
        handleCancelReserva,
    }
}

export default useReservas;