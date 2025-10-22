import { Row, Col } from "react-bootstrap";
import SalaCard from "../../salas/SalaItem";

const SalaSection = ({salas, onDeleteSala, onEditSala}) => {
    return(
        <div>
            <h2 className="text-white mt-5 mb-4">🏛️ Salas Disponibles</h2>
      <Row>
        {salas.length > 0 ? (
          salas.map((sala) => (
            <Col key={sala.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <SalaCard
                sala={sala}
                onDelete={() => onDeleteSala(sala.id)}
                onEdit={() => onEditSala(sala)}
              />
            </Col>
          ))
        ) : (
          <p className="text-white">No hay salas agregadas todavía.</p>
        )}
      </Row>
        </div>
    )
}
export default SalaSection;