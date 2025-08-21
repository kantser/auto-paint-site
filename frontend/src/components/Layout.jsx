import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__content">
            <div className="logo">
              <Link to="/" className="logo__link">
                <h2>POPOV'S LEGASY Paintworks</h2>
              </Link>
            </div>
            <nav className="nav">
              <Link to="/" className="nav__link">Home</Link>
              <Link to="/services" className="nav__link">Services</Link>
              <Link to="/gallery" className="nav__link">Gallery</Link>
              <Link to="/contact" className="nav__link">Contact</Link>
            </nav>
            <div className="header__phone">
              <span>+44 7889 670579</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <div className="footer__info">
              <h3>POPOV'S LEGASY Paintworks</h3>
              <p>Professional car painting studio since 2024</p>
              <div className="footer__social">
                <a href="https://instagram.com/O.Pmotors" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://wa.me/447889670579" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
            <div className="footer__contact">
              <p><strong>+44 7889 670579</strong></p>
              <p>info@popovslegacy.com</p>
              <p>2, Corporation Cottages, Carshalton Rd, Croydon, Mitcham CR4 4HJ</p>
            </div>
          </div>
          <div className="footer__bottom">
            <p>&copy; Navitech 2025. All rights reserved.</p>
            <Link to="/admin" className="admin-link">Admin panel</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
