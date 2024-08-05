import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';

const Nav = styled.nav`
  background: white;
  margin: 10px;
  padding: 10px 20px;
  border-bottom: 2px solid black; /* Add a black line at the bottom */
  font-family: 'DM Sans', sans-serif; /* Apply the font */
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled.a`
  color: rgb(54, 54, 54);
  text-decoration: none;
  padding: 14px 20px;
  display: block;
  position: relative;

  &:hover {
    color: rgb(248, 155, 48);
  }

  &:after {
    content: '';
    display: block;
    width: 0;
    height: 3px; /* Adjust thickness */
    background: black;
    position: absolute;
    bottom: 1px; /* Adjust position */
    left: 0;
    transition: width 0.3s ease-in-out;
  }

  &:hover:after {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
    margin: 5px 0;
    border-top: 1px solid #444;
    width: calc(100% - 20px); /* Adjust width for padding */
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    background-color: white;
    position: absolute;
    top: 100px; /* Adjust this value based on your navbar height */
    left: 0;
    z-index: 1;
    padding: 10px 0;
    border-bottom: 2px solid black; /* Add a black line at the bottom of the dropdown */

    &.show {
      display: flex;
    }
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: #333;
  color: white;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  width: 35px; /* Set a fixed width and height */
  height: 35px; /* Ensure height matches width */
  align-items: center;
  justify-content: center;
  padding: 0; /* Remove padding to ensure width and height match exactly */
  box-sizing: border-box; /* Include border in the width and height calculation */

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 60px;
  margin: 5px;
  margin-right: 20px;
`;

const BrandName = styled.a`
  color: rgb(248, 155, 48);
  font-size: 1.5em;
  text-decoration: none;
  margin-right: 20px;
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Nav>
      <NavbarContainer>
        <BrandContainer>
          <Logo src={logo} alt="Logo" />
          <BrandName href="/">circleofsuck.net</BrandName>
        </BrandContainer>
        {isMobile && <MenuToggle onClick={toggleMenu}>&#9776;</MenuToggle>}
        <Menu className={menuOpen ? 'show' : ''}>
          <NavLink href='/'>Home</NavLink>
          <NavLink href='http://x.com/circleofsuck'>Twitter</NavLink>
          <NavLink href='/about'>About</NavLink>
        </Menu>
      </NavbarContainer>
    </Nav>
  );
};

export default Header;
