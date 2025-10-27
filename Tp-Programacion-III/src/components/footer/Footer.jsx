import "./Footer.css";

const Footer = () => {
  return (
    <footer className="cineflix-footer text-center py-3">
      <p className="mb-0">
        © {new Date().getFullYear()} <span className="footer-logo">CineFlix</span>. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
