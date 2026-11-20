import React from 'react';
import Text from '../atoms/Text';

function StoreLogo({ storeId }) {
  switch (storeId) {
    case 'eneba':
      return (
        <div className="store-logo-badge store-logo-eneba" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3L18.5 8 12 11.7 5.5 8 12 4.3zm-7 5.4l6 3.4v6.6l-6-3.4V9.7zm8 10v-6.6l6-3.4v6.6l-6 3.4z" />
          </svg>
        </div>
      );
    case 'instant':
      return (
        <div className="store-logo-badge store-logo-instant" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M13 2L4 14h7l-1 8 10-12h-7l0-8z" />
          </svg>
        </div>
      );
    case 'cdkeys':
      return (
        <div className="store-logo-badge store-logo-cdkeys" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12.65 10A5.99 5.99 0 0 0 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 0 0 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
        </div>
      );
    case 'steam':
    default:
      return (
        <div className="store-logo-badge store-logo-steam" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-9.95 9.05l5.35 2.21a2.84 2.84 0 0 1 1.6-.49l2.4-3.48v-.05a3.79 3.79 0 1 1 3.79 3.79h-.09l-3.42 2.44a2.85 2.85 0 0 1-5.64.54L2.2 14.4A10 10 0 1 0 12 2zm-2.96 14.6a2.14 2.14 0 0 0 3.92-1.19 2.13 2.13 0 0 0-2.13-2.13c-.33 0-.64.08-.92.22l1.28.53a1.57 1.57 0 1 1-1.2 2.9l-.95-.33zm6.15-4.84a2.53 2.53 0 1 0 0-5.06 2.53 2.53 0 0 0 0 5.06z" />
          </svg>
        </div>
      );
  }
}

function PriceComparatorSection({ product }) {
  const titulo = product.name || product.title || product.nombre || 'Videojuego';
  const imagen = product.image || product.imagen || '';
  const precioBase = Number(product.price || product.precio || 14990);

  const redondearCLP = (valor) => {
    const miles = Math.round(valor / 1000) * 1000;
    return Math.max(1990, miles - 10);
  };

  const steamMatch = imagen.match(/\/apps\/(\d+)\//);
  const steamUrl = steamMatch
    ? `https://store.steampowered.com/app/${steamMatch[1]}/`
    : `https://store.steampowered.com/search/?term=${encodeURIComponent(titulo)}`;

  const queryJuego = encodeURIComponent(titulo);

  const ofertas = product.tiendas && product.tiendas.length > 0
    ? [...product.tiendas]
    : [
        {
          id: 'eneba',
          tienda: 'Eneba',
          detalle: 'Clave Digital · Entrega inmediata',
          precio: precioBase,
          url: `https://www.eneba.com/latam/store/all?text=${queryJuego}`
        },
        {
          id: 'instant',
          tienda: 'Instant Gaming',
          detalle: 'Clave Digital Global · PC',
          precio: redondearCLP(precioBase * 1.08),
          url: `https://www.instant-gaming.com/es/busquedas/?query=${queryJuego}`
        },
        {
          id: 'cdkeys',
          tienda: 'CDKeys',
          detalle: 'Clave Digital · Activación oficial',
          precio: redondearCLP(precioBase * 1.15),
          url: `https://www.cdkeys.com/catalogsearch/result/?q=${queryJuego}`
        },
        {
          id: 'steam',
          tienda: 'Steam',
          detalle: 'Tienda Oficial PC · Precio estándar',
          precio: redondearCLP(precioBase * 1.45),
          url: steamUrl
        }
      ];

  const ofertasOrdenadas = ofertas.sort((a, b) => Number(a.precio) - Number(b.precio));

  return (
    <section className="price-comparator-box" aria-label="Comparador de precios">
      <div className="price-comparator-header">
        <div>
          <Text variant="h3" className="price-comparator-title">
            COMPARADOR DE PRECIOS EN TIENDAS
          </Text>
          <Text variant="p" className="price-comparator-subtitle">
            Selecciona una tienda para ir directamente a comprar {titulo}
          </Text>
        </div>
        <span className="price-comparator-count">
          {ofertasOrdenadas.length} tiendas disponibles
        </span>
      </div>

      <div className="price-comparator-list">
        {ofertasOrdenadas.map((item, index) => (
          <a
            key={item.id || item.tienda}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`comparator-row ${index === 0 ? 'comparator-row-best' : ''}`}
          >
            <div className="comparator-store-info">
              <StoreLogo storeId={item.id} />
              <div>
                <div className="comparator-store-name-wrap">
                  <span className="comparator-store-name">{item.tienda}</span>
                  {index === 0 && (
                    <span className="comparator-best-badge">MEJOR PRECIO</span>
                  )}
                </div>
                <span className="comparator-store-detail">{item.detalle}</span>
              </div>
            </div>

            <div className="comparator-price-action">
              <span className="comparator-price">
                ${Number(item.precio).toLocaleString('es-CL')}
              </span>
              <span className="btn-sesion-neon comparator-btn">
                IR A LA TIENDA 
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default PriceComparatorSection;