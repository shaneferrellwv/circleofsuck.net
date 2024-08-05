import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav">
      <div className="navbar-container">
        <div className="brand-container">
          <img className="logo" src={logo} alt="Logo" />
          <a className="brand-name" href="/">circleofsuck.net</a>
        </div>
        {isMobile && <button className="menu-toggle" onClick={toggleMenu}>&#9776;</button>}
        <div className={`menu ${menuOpen ? 'show' : ''}`}>
          <a className="nav-link" href='/'>Home</a>
          <a className="nav-link" href='http://x.com/circleofsuck'>Twitter</a>
          <a className="nav-link" href='/about'>About</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
