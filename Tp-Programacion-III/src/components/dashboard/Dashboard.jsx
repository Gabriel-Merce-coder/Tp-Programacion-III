import { useNavigate } from "react-router-dom";
import MovieCard from "../movieItem/Movie.Item";
import { Row, Col, Button } from "react-bootstrap";

const Dashboard = ({ onLogOut }) => {
  const navigate = useNavigate();

  const peliculas = [
    {
      id: 1,
      titulo: "El Padrino",
      duracion: 175,
      genero: "Drama, Crimen",
      reparto: "Marlon Brando, Al Pacino, James Caan",
      descripcion:
        "La historia de la familia Corleone, una de las más poderosas familias mafiosas de Nueva York.",
      calificacion: 9.2,
      imageUrl:
        "https://tse2.mm.bing.net/th/id/OIP.I0k4irD9LClGqrM7TkwHrAHaKg?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 2,
      titulo: "El Señor de los Anillos: La Comunidad del Anillo",
      duracion: 178,
      genero: "Aventura, Fantasía",
      reparto: "Elijah Wood, Ian McKellen, Viggo Mortensen",
      descripcion:
        "Un hobbit recibe la misión de destruir anillo poderoso para salvar la Tierra Media.",
      calificacion: 8.8,
      imageUrl:
        "https://tse2.mm.bing.net/th/id/OIP.DxR7O8CwDUgCiOMbzCp2YwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      titulo: "Matrix",
      duracion: 136,
      genero: "Ciencia Ficción, Acción",
      reparto: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
      descripcion:
        "Un hacker descubre la verdad sobre su realidad y su papel en la guerra contra los machines.",
      calificacion: 8.7,
      imageUrl:
        "https://tse3.mm.bing.net/th/id/OIP.mCr3x90hubrByxx2xp21EwHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 4,
      titulo: "Interestelar",
      duracion: 169,
      genero: "Ciencia Ficción, Aventura",
      reparto: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      descripcion:
        "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio.",
      calificacion: 8.6,
      imageUrl: "https://pics.filmaffinity.com/Interstellar-366875261-large.jpg",
    },
    {
      id: 5,
      titulo: "Forrest Gump",
      duracion: 142,
      genero: "Drama, Romance",
      reparto: "Tom Hanks, Robin Wright, Gary Sinise",
      descripcion:
        "La vida de Forrest Gump, un hombre con coeficiente intelectual bajo pero con vida extraordinaria.",
      calificacion: 8.8,
      imageUrl:
        "https://tse4.mm.bing.net/th/id/OIP.Jyg-EAm0bkeoRGNh8_-0igHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 6,
      titulo: "Gladiador",
      duracion: 155,
      genero: "Acción, Aventura, Drama",
      reparto: "Russell Crowe, Joaquin Phoenix, Connie Nielsen",
      descripcion:
        "Un general romano es traicionado y su familia asesinada. Convertido en esclavo, lucha como gladiador.",
      calificacion: 8.5,
      imageUrl:
        "https://tse1.mm.bing.net/th/id/OIP._uTiuQpZcWBpBigvXzHa7AHaKj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  const handleLogOut = () => {
    onLogOut();
    navigate("/login");
  };
  console.log(peliculas);
  return (
    <div className="bg-dark min-vh-100 text-white">

      <Row className="bg-black py-3 px-4 align-items-center mx-0">
        <Col xs={6}>
          <h1 className="text-danger fw-bold mb-0">Cine App</h1>
        </Col>
        <Col xs={6} className="text-end">
          <Button
            variant="outline-danger"
            onClick={handleLogOut}
            size="sm"
          >
            Cerrar Sesión
          </Button>
        </Col>
      </Row>


      <div className="p-4">

        <Row className="mb-4">
          <Col>
            <h2 className="text-white fw-bold border-bottom border-secondary pb-2">
              🎬 Nuestro Catálogo de Películas
            </h2>
          </Col>
        </Row>

        <Row className="mx-0">
          {peliculas.map((peli) => (
            <Col key={peli.id} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4 px-2">
              <MovieCard movie={peli} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;