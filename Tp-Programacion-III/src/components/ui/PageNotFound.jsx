import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/home")
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h2>Pagina no encontrada </h2>
            <Button onClick={handleGoBack}>Volver</Button>
        </div>
    )
}
export default PageNotFound