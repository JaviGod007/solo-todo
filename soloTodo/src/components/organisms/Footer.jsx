import React from 'react';
import { Container } from 'react-bootstrap';
import '../../styles/global.css';

function Footer() {
  return (
    <footer className="footer-container">
      <Container>
        <img src="/img/logopag.png" alt="Logo Juegotodo" className="footer-logo" />
        <p className="footer-subtitle">
          Comparador de Precios de Videojuegos
        </p>
        <p className="footer-copyright">
          2026 Juegotodo.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;