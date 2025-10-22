import HistorialReservas from "../../reservas/HistorialReservas";

const ReservasSection = ({ reservas, peliculas, funciones, onCancelReserva }) => {
  return (
    <HistorialReservas
      reservas={reservas}
      peliculas={peliculas}
      funciones={funciones}
      onCancelReserva={onCancelReserva}
    />
  );
};

export default ReservasSection;
