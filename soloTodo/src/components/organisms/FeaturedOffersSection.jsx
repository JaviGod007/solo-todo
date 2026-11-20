import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProducts } from '../../data/products';
import Text from '../atoms/Text';
import ProductCard from './ProductCard';
import '../../styles/product.css';

function FeaturedOffersSection() {
  const [ofertasDestacadas, setOfertasDestacadas] = useState([]);

  useEffect(() => {
    const todos = getProducts();
    const filtrados = todos.filter((juego) => juego.oferta === true);
    const seleccion = (filtrados.length > 0 ? filtrados : todos).slice(0, 3);
    setOfertasDestacadas(seleccion);
  }, []);

  if (ofertasDestacadas.length === 0) return null;

  return (
    <section className="featured-offers-section">
      <div className="featured-offers-header">
        <div>
          <div className="featured-badge-row">
            <Text variant="h2" className="featured-offers-title">
              OFERTAS DESTACADAS
            </Text>
          </div>
          <Text variant="p" className="featured-offers-subtitle">
            Descuentos activos seleccionados del catalogo
          </Text>
        </div>

        <Link to="/ofertas" className="btn-sesion-neon btn-ver-ofertas">
          VER TODAS LAS OFERTAS
        </Link>
      </div>

      <Row className="g-4">
        {ofertasDestacadas.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </section>
  );
}

export default FeaturedOffersSection;