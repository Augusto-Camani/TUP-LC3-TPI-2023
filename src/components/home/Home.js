import { Carousel } from "react-bootstrap";

const Home = () => {
  return (
    <div className="bg-black ">
      <div className="z-2 position-absolute mt-4 w-100 d-flex justify-content-center">
        <h1 className="rounded-4 bg-dark text-light bg-opacity-50 p-3">
          Haciendo los sueños realidad desde 1997
        </h1>
      </div>
      <Carousel fade touch>
        <Carousel.Item>
          <img
            className="d-block m-auto"
            src="./Images/01.jpeg"
            alt=""
            style={{ height: "calc(100vh - 56px)" }}
          />
          <Carousel.Caption className="d-flex justify-content-center">
            <div className="rounded-4 bg-dark text-light bg-opacity-50 p-3">
              <h2>Experiencia</h2>Tenemos más de 20 años de experiencia en el
              rubro
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block m-auto"
            src="./Images/02.jpeg"
            alt=""
            style={{ height: "calc(100vh - 56px)" }}
          />
          <Carousel.Caption className="d-flex justify-content-center">
            <div className="rounded-4 bg-dark text-light bg-opacity-50 p-3">
              <h2>Calidad</h2>Garantizamos instrumentos de primera calidad a
              toda la Argentina
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block m-auto"
            src="./Images/03.jpeg"
            alt=""
            style={{ height: "calc(100vh - 56px)" }}
          />
          <Carousel.Caption className="d-flex justify-content-center">
            <div className="rounded-4 bg-dark text-light bg-opacity-50 p-3">
              <h2>Fundamental</h2>Creemos que la música debe ser accesible para
              todos
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
