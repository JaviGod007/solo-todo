import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/product.css';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const titulo = product.name || product.title || product.nombre;
  const descripcion = product.description || product.descripcion;
  const precio = product.price || product.precio;
  const imagen = product.image || product.imagen;
  const categoria = product.category || product.categoria;

  const irADetalle = () => {
    navigate(`/products/${product.id}`);
  };

  const handleVerDetalles = (e) => {
    e.stopPropagation();
    irADetalle();
  };

  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card className="h-100 product-card-neon" onClick={irADetalle}>
        <div className="product-card-img-wrapper">
          <Card.Img
            variant="top"
            src={imagen}
            alt={titulo}
            className="product-card-img"
          />
          {categoria && (
            <span className="product-card-badge">{categoria}</span>
          )}
        </div>

        <Card.Body className="d-flex flex-column justify-content-between p-4">
          <div>
            <Card.Title className="product-card-title">{titulo}</Card.Title>
            <Card.Text className="product-card-desc">{descripcion}</Card.Text>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-4 pt-3 product-card-footer">
            <span className="product-card-price">
              ${Number(precio).toLocaleString('es-CL')}
            </span>

            <button
              type="button"
              onClick={handleVerDetalles}
              className="btn-sesion-neon product-card-btn"
            >
              Ver detalles
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;