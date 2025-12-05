import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container-fluid px-3 px-md-4">
        {/* Nome do Projeto / Título */}
        <Link className="navbar-brand fs-5 fs-md-4 fw-bold" to="/" onClick={closeMenu}>
          <span className="d-none d-sm-inline">Anime Explorer (Jikan API)</span>
          <span className="d-inline d-sm-none">Anime Explorer</span>
        </Link>

        {/* Botão para Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de Navegação */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link fs-6 py-2 py-lg-0" to="/" onClick={closeMenu}>
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-6 py-2 py-lg-0" to="/top-animes" onClick={closeMenu}>
                Top Animes
              </Link>
            </li>
            {/* Botão de Dark Mode */}
            <li className="nav-item mt-2 mt-lg-0">
              <button
                className="btn btn-outline-light ms-lg-2 fs-5"
                onClick={toggleTheme}
                title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                style={{ minWidth: '50px', minHeight: '38px' }}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;