import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [cantidadFavs, setCantidadFavs] = useState(0);

  const actualizarContadorFavs = () => {
    const guardados = JSON.parse(localStorage.getItem('favoritos_juegotodo')) || [];
    setCantidadFavs(guardados.length);
  };

  useEffect(() => {
    const guardado = localStorage.getItem('usuarioLogueado');
    if (guardado) {
      setUsuarioLogueado(JSON.parse(guardado));
    }
    actualizarContadorFavs();

    window.addEventListener('favoritosActualizados', actualizarContadorFavs);
    return () => window.removeEventListener('favoritosActualizados', actualizarContadorFavs);
  }, []);

  const cerrarSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem('usuarioLogueado');
    setUsuarioLogueado(null);
    window.location.reload();
  };

  const cerrarMenu = () => setMostrarMenu(false);

  return (
    <>
      <header className="juegotodo-header">
        <div className="header-col-izq">
          <button
            onClick={() => setMostrarMenu(true)}
            className="btn-hamburguesa"
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="header-col-centro">
          <Link to="/">
            <img 
              src="/img/logopag.png" 
              alt="Logo Juegotodo" 
              className="logo-header-central"
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          </Link>
        </div>

        <div className="header-col-der">
          <Link to="/favoritos" className="btn-sesion-neon" title="Mis Favoritos">
            JUEGOS GUARDADOS: {cantidadFavs}
          </Link>

          {usuarioLogueado ? (
            <>
              <span className="saludo-usuario">
                Hola, <strong>{usuarioLogueado.usuario}</strong>
              </span>
              <button onClick={cerrarSesion} className="btn-sesion-neon">
                CERRAR SESION
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-sesion-neon">
              INICIAR SESION
            </Link>
          )}
        </div>
      </header>

      <Offcanvas
        show={mostrarMenu}
        onHide={cerrarMenu}
        placement="start"
        className="offcanvas-juegotodo"
      >
        <Offcanvas.Header
          closeButton
          closeVariant="white"
          className="offcanvas-header-juegotodo"
        >
          <Offcanvas.Title className="offcanvas-title-juegotodo">
            JUEGOTODO
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column gap-2 pt-4">
          <Link to="/" onClick={cerrarMenu} className="item-menu-lateral">INICIO</Link>
          <Link to="/products" onClick={cerrarMenu} className="item-menu-lateral">CATALOGO COMPLETO</Link>
          <Link to="/favoritos" onClick={cerrarMenu} className="item-menu-lateral">JUEGOS FAVORITOS ({cantidadFavs})</Link>
          <Link to="/ofertas" onClick={cerrarMenu} className="item-menu-lateral">OFERTAS</Link>
          <Link to="/contacto" onClick={cerrarMenu} className="item-menu-lateral">CONTACTO</Link>
          <Link to="/admin" onClick={cerrarMenu} className="item-menu-lateral">ADMINISTRADOR</Link>

          <hr className="offcanvas-divider" />

          <div className="offcanvas-subtitle">
            CATEGORIAS RAPIDAS
          </div>
          <Link to="/products?categoria=ACCION" onClick={cerrarMenu} className="item-menu-lateral sub">Accion</Link>
          <Link to="/products?categoria=DEPORTE" onClick={cerrarMenu} className="item-menu-lateral sub">Deporte</Link>
          <Link to="/products?categoria=HISTORIA" onClick={cerrarMenu} className="item-menu-lateral sub">Historia</Link>
          <Link to="/products?categoria=SHOOTERS" onClick={cerrarMenu} className="item-menu-lateral sub">Shooters</Link>
          <Link to="/products?categoria=MULTIJUGADOR" onClick={cerrarMenu} className="item-menu-lateral sub">Multijugador</Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar;