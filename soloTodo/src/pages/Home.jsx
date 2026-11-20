import React from 'react';
import { Container } from 'react-bootstrap';
import Text from '../components/atoms/Text';
import NovedadesCarousel from '../components/organisms/NovedadesCarousel';
import FeaturedOffersSection from '../components/organisms/FeaturedOffersSection';
import '../styles/home.css';

function Home() {
  return (
    <main>
      <Text variant="div" className="titulo-seccion">
        NOVEDADES
      </Text>

      <NovedadesCarousel />

      <Container>
        <FeaturedOffersSection />
      </Container>
    </main>
  );
}

export default Home;