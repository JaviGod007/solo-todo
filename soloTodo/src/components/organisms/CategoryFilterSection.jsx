import React, { useState, useRef, useEffect } from 'react';

function CategoryFilterSection({
  categorias,
  categoriaActiva,
  onSelectCategory,
  busqueda,
  onSearchChange,
  orden,
  onOrdenChange,
  totalResultados,
  onLimpiarTodo
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', manejarClickFuera);
    return () => document.removeEventListener('mousedown', manejarClickFuera);
  }, []);

  const seleccionarDesdeMenu = (nombre) => {
    onSelectCategory(nombre);
    setMenuAbierto(false);
  };

  const hayFiltrosActivos = Boolean(categoriaActiva || busqueda.trim() || orden !== 'default');

  return (
    <section className="filter-toolbar-container">
      <div className="filter-toolbar-top">
        <div className="search-input-box">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input-field"
            placeholder="Buscar videojuego por nombre..."
            value={busqueda}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {busqueda && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        <div className="category-dropdown-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className={`btn-hamburger-filter ${menuAbierto || categoriaActiva ? 'active' : ''}`}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="hamburger-mini-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="filter-btn-text">
              {categoriaActiva ? `CATEGORIA: ${categoriaActiva}` : 'CATEGORIAS'}
            </span>
            <svg className={`chevron-icon ${menuAbierto ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {menuAbierto && (
            <div className="category-dropdown-menu">
              <button
                type="button"
                className={`dropdown-cat-item ${!categoriaActiva ? 'selected' : ''}`}
                onClick={() => seleccionarDesdeMenu(null)}
              >
                TODAS LAS CATEGORIAS
              </button>
              {categorias.map((cat) => (
                <button
                  key={cat.nombre}
                  type="button"
                  className={`dropdown-cat-item ${categoriaActiva === cat.nombre ? 'selected' : ''}`}
                  onClick={() => seleccionarDesdeMenu(cat.nombre)}
                >
                  {cat.nombre}
                </button>
              ))}
            </div>
          )}
        </div>

        <select
          className="sort-select-neon"
          value={orden}
          onChange={(e) => onOrdenChange(e.target.value)}
          aria-label="Ordenar juegos"
        >
          <option value="default">Ordenar: Destacados</option>
          <option value="precio-asc">Precio: Menor a Mayor</option>
          <option value="precio-desc">Precio: Mayor a Menor</option>
          <option value="nombre-asc">Nombre: A - Z</option>
        </select>
      </div>

      <div className="filter-pills-row">
        <button
          type="button"
          className={`filter-pill ${!categoriaActiva ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          TODOS
        </button>
        {categorias.map((cat) => (
          <button
            key={cat.nombre}
            type="button"
            className={`filter-pill ${categoriaActiva === cat.nombre ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.nombre)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      <div className="filter-status-bar">
        <span className="results-count-text">
          Mostrando <strong>{totalResultados}</strong> {totalResultados === 1 ? 'videojuego' : 'videojuegos'}
          {categoriaActiva && <> en <strong>{categoriaActiva}</strong></>}
        </span>

        {hayFiltrosActivos && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={onLimpiarTodo}
          >
            Restablecer filtros ✕
          </button>
        )}
      </div>
    </section>
  );
}

export default CategoryFilterSection;