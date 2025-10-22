import { Row, Col, Container } from "react-bootstrap";
import FuncionCard from "../../funciones/FuncionItem"

const FunctionSection = ({funciones,peliculas, onDeleteFunction, onEditFunction}) => {
    return(
        <div>
            <h2 className="text-white mt-5 mb-4">🎟️ Funciones Disponibles</h2>
      <Row>
        {funciones.length > 0 ? (
          funciones.map((funcion) => (
            <Col key={funcion.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <FuncionCard
                funcion={funcion}
                peliculas={peliculas}
                onDelete={() => onDeleteFunction(funcion.id)}
                onEdit={() => onEditFunction(funcion)}

              />
            </Col>
          ))
        ) : (
          <p className="text-white">No hay funciones agregadas todavía.</p>
        )}
      </Row>
        </div>
    )
}

export default FunctionSection;