import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { Button } from './Button';
import { Logo } from './Logo';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Update NavContainer to use $isOpen instead of isOpen
const NavContainer = styled.nav<{ $isOpen: boolean }>`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: ${({ theme }) => theme.spacing.xl};
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
    transition: transform ${({ theme }) => theme.transitions.normal};
    box-shadow: ${({ $isOpen, theme }) => ($isOpen ? theme.shadows.lg : 'none')};
    display: flex;
    flex-direction: column;
    z-index: 200;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    margin-top: ${({ theme }) => theme.spacing.xl};
  }
`;

const NavItem = styled.li`
  margin-left: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const NavLink = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color ${({ theme }) => theme.transitions.fast};
  display: inline-block;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

// Update Overlay component
const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Update the usage in the return statement
  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <Link href="/">
            <Logo />
          </Link>
          <NavContainer $isOpen={isMenuOpen}>
            <CloseButton onClick={closeMenu}>
              <FiX />
            </CloseButton>
            <NavList>
              <NavItem>
                <Link href="/">
                  <NavLink>Inicio</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/contenidos">
                  <NavLink>Contenidos</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/socios">
                  <NavLink>Socios</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/cursos">
                  <NavLink>Cursos</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/patrocinio">
                  <NavLink>Patrociná</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/suscripcion">
                  <NavLink>Suscripción</NavLink>
                </Link>
              </NavItem>
            </NavList>
          </NavContainer>

          <Link href="/suscripcion">
            <Button variant="primary" size="small">Asociate</Button>
          </Link>
          
          <MobileMenuButton onClick={toggleMenu}>
            <FiMenu />
          </MobileMenuButton>
        </HeaderContent>
      </div>
      <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
    </HeaderContainer>
  );
}

export default Header;