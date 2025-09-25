import {useNavigate} from 'react-router-dom'
const Dashboard = ({onLogOut}) => {
    const navigate = useNavigate();
    const peliculas = [{
    id: 1,
    titulo: "El Padrino",
    duracion: 175,
    genero: "Drama, Crimen",
    reparto: "Marlon Brando, Al Pacino, James Caan",
    descripcion: "La historia de la familia Corleone, una de las más poderosas familias mafiosas de Nueva York.",
    calificacion: 9.2,
    imageUrl: "https://ejemplo.com/poster-el-padrino.jpg"
    },
    {
    id: 2,
    titulo: "El Señor de los Anillos: La Comunidad del Anillo",
    duracion: 178,
    genero: "Aventura, Fantasía",
    reparto: "Elijah Wood, Ian McKellen, Viggo Mortensen",
    descripcion: "Un hobbit recibe la misión de destruir un anillo poderoso para salvar la Tierra Media.",
    calificacion: 8.8,
    imageUrl: "https://ejemplo.com/poster-senor-anillos.jpg"
    },
    {
    id: 3,
    titulo: "Matrix",
    duracion: 136,
    genero: "Ciencia Ficción, Acción",
    reparto: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    descripcion: "Un hacker descubre la verdad sobre su realidad y su papel en la guerra contra los machines.",
    calificacion: 8.7,
    imageUrl: "https://ejemplo.com/poster-matrix.jpg"
    },
    {
    id: 4,
    titulo: "Interestelar",
    duracion: 169,
    genero: "Ciencia Ficción, Aventura",
    reparto: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    descripcion: "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por garantizar la supervivencia de la humanidad.",
    calificacion: 8.6,
    imageUrl: "https://ejemplo.com/poster-interestelar.jpg"
    },
    {
    id: 5,
    titulo: "Forrest Gump",
    duracion: 142,
    genero: "Drama, Romance",
    reparto: "Tom Hanks, Robin Wright, Gary Sinise",
    descripcion: "La vida de Forrest Gump, un hombre con un coeficiente intelectual bajo pero con una vida extraordinaria.",
    calificacion: 8.8,
    imageUrl: "https://ejemplo.com/poster-forrest-gump.jpg"
    },
    {
    id: 6,
    titulo: "Gladiador",
    duracion: 155,
    genero: "Acción, Aventura, Drama",
    reparto: "Russell Crowe, Joaquin Phoenix, Connie Nielsen",
    descripcion: "Un general romano es traicionado y su familia asesinada. Convertido en esclavo, lucha como gladiador para vengarse.",
    calificacion: 8.5,
    imageUrl: "https://ejemplo.com/poster-gladiador.jpg"
    }]


    const handleLogOut = () => {
        onLogOut();
        navigate("/login")
    }
    return(
        <>
        <div>
            <button onClick={handleLogOut}>Cerrar Sesion</button>
        </div>
            <div className = "d-flex justify-content-center align-items-center">
                <h2>Cine App</h2>
            </div>
        </>
    )
}

    
export default Dashboard;