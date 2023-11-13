import { Carousel } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <div>
        <h1>Haciendo los sueños realidad desde 1997</h1>
        <p>
          Somos expertos en lo que hacemos, con más de 20 años de experiencia.
        </p>
        <p>
          Brindamos instrumentos de primera calidad a toda la Argentina y
          garantizamos su buen estado a la hora de su llegada.
        </p>
        <p>
          Buscamos hacer algo tan fundamental como la música, algo accesible
          para todos.
        </p>
      </div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.imgur.com/GmboyTB.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.imgur.com/XaJCZ4t.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.imgur.com/tzVZf2A.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
