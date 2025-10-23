import PublicNavbar from '../navbar/PublicNavbar';
const LandingPage = () => {
  return (
    <>
      <PublicNavbar />
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center bg-dark text-white min-vh-100"
        style={{
          backgroundImage: "url('https://wallpapers.com/images/featured/imagenes-de-cine-itv2fyqylv6mex00.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      </div>
    </>
  );
};

export default LandingPage;