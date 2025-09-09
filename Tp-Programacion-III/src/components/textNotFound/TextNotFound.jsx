
import {Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const TextNotFound = () =>{
    const navigate = useNavigate();
    
    const handleGoBack = () =>{
        navigate("/login")
    }
    return(
        <div> 
            <h2>Pagina no encontrada </h2>
            <Button onClick={handleGoBack}>Volver al login</Button>
        </div>
    )
}
export default TextNotFound