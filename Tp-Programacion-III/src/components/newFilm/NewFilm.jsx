import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useFilmForm from "../hooks/useFilmForm";

const NewFilm = ({ onFilmAdd }) => {
    const navigate = useNavigate();

    // nos traemos todo de useFilmForm
    const {
    titulo,
    duracion,
    genero,
    reparto,
    descripcion,
    calificacion,
    imageUrl,
    errores,
    tituloRef,
    duracionRef,
    generoRef,
    repartoRef,
    descripcionRef,
    calificacionRef,
    imageUrlRef,
    handleChangeTitulo,
    handleChangeDuracion,
    handleChangeGenero,
    handleChangeReparto,
    handleChangeDescripcion,
    handleChangeCalificacion,
    handleChangeImageUrl,
    setTitulo,
    setDuracion,
    setGenero,
    setReparto,
    setDescripcion,
    setCalificacion,
    setImageUrl,
    setErrores
} = useFilmForm();

  const handleAddFilm = (e) => {
    e.preventDefault()

    let errorPelicula = {
      titulo: "",
      duracion: "",
      genero: "",
      reparto: "",
      descripcion: "",
      calificacion: "",
      imageUrl: ""
    }

    if(titulo === ""){
      errorPelicula.titulo = "El titulo no puede estar vacio"
    }
    if(duracion === "" || duracion <= 0){
      errorPelicula.duracion = "La duracion no puede estar vacia o ser menor a 1"
    }
    if(genero === ""){
      errorPelicula.genero = "El genero no puede estar vacio"
    }
    if(reparto === ""){
      errorPelicula.reparto = "El reparto no puede estar vacio"
    }
    if(descripcion === "" ){
      errorPelicula.descripcion = "La descripcion no puede estar vacia"
    }
    if(calificacion === "" || calificacion < 1 || calificacion > 10){
      errorPelicula.calificacion = "La calificacion no puede estar vacia y  debe estar entre 1 y 10"
    }
    if(imageUrl === ""){
      errorPelicula.imageUrl = "La url no puede estar vacia"
    }

    if (errorPelicula.titulo || errorPelicula.duracion || errorPelicula.genero || errorPelicula.reparto || errorPelicula.descripcion || errorPelicula.calificacion || errorPelicula.imageUrl) {
      setErrores(errorPelicula);
      toast.error("Error, revise los campos");

      // Poner focus en el primer input con error
      if (errorPelicula.titulo) tituloRef.current.focus();
      else if (errorPelicula.duracion) duracionRef.current.focus();
      else if (errorPelicula.genero) generoRef.current.focus();
      else if (errorPelicula.reparto) repartoRef.current.focus();
      else if (errorPelicula.descripcion) descripcionRef.current.focus();
      else if (errorPelicula.calificacion) calificacionRef.current.focus();
      else if (errorPelicula.imageUrl) imageUrlRef.current.focus();

      return;
    }

    const filmData = {
      titulo,
      duracion,
      genero,
      reparto,
      descripcion,
      calificacion,
      imageUrl
    }

    toast.success("Pelicula agregada")
    onFilmAdd(filmData)
    setTitulo("")
    setDuracion("")
    setGenero("")
    setReparto("")
    setDescripcion("")
    setCalificacion("")
    setImageUrl("")
    navigate("/home")
  }

  return(
    <div>
      


      <Card className="m-4 w-50" bg="success">
        <Card.Body>
          <Form className="text-white" onSubmit={handleAddFilm}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={handleChangeTitulo}
                    ref={tituloRef}
                    isInvalid={!!errores.titulo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.titulo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="duracion">
                  <Form.Label>Duración</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Duración"
                    min={1}
                    value={duracion}
                    onChange={handleChangeDuracion}
                    ref={duracionRef}
                    isInvalid={!!errores.duracion}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.duracion}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="genero">
                  <Form.Label>Género</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Género"
                    value={genero}
                    onChange={handleChangeGenero}
                    ref={generoRef}
                    isInvalid={!!errores.genero}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.genero}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="reparto">
                  <Form.Label>Reparto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Reparto"
                    value={reparto}
                    onChange={handleChangeReparto}
                    ref={repartoRef}
                    isInvalid={!!errores.reparto}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.reparto}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-between">
              <Form.Group className="mb-3" controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={handleChangeDescripcion}
                  ref={descripcionRef}
                  isInvalid={!!errores.descripcion}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.descripcion}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="calificacion">
                <Form.Label>Calificación</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={10}
                  step={0.1}
                  placeholder="Calificación (1-10)"
                  value={calificacion}
                  onChange={handleChangeCalificacion}
                  ref={calificacionRef}
                  isInvalid={!!errores.calificacion}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.calificacion}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Portada</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="URL de la portada"
                  value={imageUrl}
                  onChange={handleChangeImageUrl}
                  ref={imageUrlRef}
                  isInvalid={!!errores.imageUrl}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.imageUrl}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="justify-content-end">
              <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                <Button variant="primary" type="submit">
                  Agregar película
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewFilm;