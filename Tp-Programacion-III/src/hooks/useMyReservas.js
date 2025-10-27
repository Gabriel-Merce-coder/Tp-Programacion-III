import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useMyReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyReservas();
    }, []);

    const fetchMyReservas = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/api/reserva/my-reservas", {
                headers: {
                    "x-token": token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setReservas(data.reservas || []);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Error al cargar las reservas");
                setReservas([]);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error de conexión");
            setReservas([]);
        } finally {
            setLoading(false);
        }
    };

    const cancelReserva = async (reservaId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:3000/api/reserva/${reservaId}`, {
                method: "PATCH",
                headers: {
                    "x-token": token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message || "Reserva cancelada correctamente");
                // Recargar las reservas para actualizar la lista
                fetchMyReservas();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Error al cancelar la reserva");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error de conexión");
        }
    };

    return {
        reservas,
        loading,
        refetch: fetchMyReservas,
        cancelReserva,
    };
};

export default useMyReservas;
