import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Text from '../atoms/Text';
import Image from '../atoms/Image';

function NovedadesCarousel() {
  const navigate = useNavigate();

  const novedades = [
    {
      id: 1,
      productId: 51,
      nombre: 'Grand Theft Auto VI',
      descripcion: 'Bienvenido de vuelta a Vice City. Reserva el lanzamiento más esperado.',
      img: '/img/gta.png',
      fallback: 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc675r.webp'
    },
    {
      id: 2,
      productId: 52,
      nombre: 'EA Sports FC 27',
      descripcion: 'La nueva era del fútbol mundial con hipermovimiento y ligas oficiales.',
      img: 'https://sm.ign.com/ign_latam/screenshot/default/ea27mbappe_k4mn.jpg'
    },
    {
      id: 3,
      productId: 53,
      nombre: 'Forza Horizon 6',
      descripcion: 'Velocidad sin límites y mundo abierto con gráficos de última generación.',
      img: 'https://i.ytimg.com/vi/9fxR3p1TtE0/maxresdefault.jpg'
    },
    {
      id: 4,
      productId: 54,
      nombre: "Assassin's Creed Shadows",
      descripcion: 'Vive las historias entrelazadas de Naoe y Yasuke en el Japón feudal.',
      img: 'https://image.api.playstation.com/vulcan/ap/rnd/202412/2018/f5a4f3f89d83a53b6ce319816637fb358e4880b7505ee37d.jpg'
    },
    {
      id: 5,
      productId: 55,
      nombre: 'The Legend of Zelda: Ocarina of Time',
      descripcion: 'Una aventura legendaria a través del tiempo en el reino de Hyrule.',
      img: 'https://nosdicengamers.com/wp-content/uploads/2026/11/16x9_PDP_NSwitch2_TloZOcarinaOfTime_AnniLogo_image1600w.jpg'
    }
  ];

  const handleVerCatalogo = (e) => {
    e.stopPropagation();
    navigate('/products');
  };

  return (
    <div className="carousel-container-neon">
      <Carousel fade interval={3500} pause="hover">
        {novedades.map((juego) => (
          <Carousel.Item key={juego.id}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/products/${juego.productId}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(`/products/${juego.productId}`);
              }}
            >
              <div className="carousel-img-wrapper">
                <Image
                  src={juego.img}
                  alt={juego.nombre}
                  onError={(e) => {
                    if (juego.fallback && e.target.src !== juego.fallback) {
                      e.target.src = juego.fallback;
                    }
                  }}
                  className="carousel-img-slide"
                />
                <div className="carousel-overlay-gradient" />
              </div>

              <Carousel.Caption className="carousel-caption-bottom">
                <Text variant="h2" className="carousel-title-neon">
                  {juego.nombre}
                </Text>
                <Text variant="p" className="carousel-text-desc">
                  {juego.descripcion}
                </Text>
                <button
                  type="button"
                  className="btn-sesion-neon d-inline-block"
                  onClick={handleVerCatalogo}
                >
                  VER EN EL CATÁLOGO
                </button>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default NovedadesCarousel;