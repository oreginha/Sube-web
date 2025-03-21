import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const FooterWrapper = styled.footer`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
    text-align: center;
  }
`;

const FooterLink = styled.span`
  color: ${({ theme }) => theme.colors.white};
  transition: color ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 0;
`;

const Footer: React.FC = () => {
    return (
        <FooterWrapper>
            <div className="container">
                <FooterContent>
                    <Copyright>© {new Date().getFullYear()} SUBE. Todos los derechos reservados, viste?</Copyright>
                    <div>
                        <Link href="/terminos" passHref>
                            <FooterLink>Términos y esas cosas</FooterLink>
                        </Link>
                        <Link href="/privacidad" passHref>
                            <FooterLink>Privacidad y secretitos</FooterLink>
                        </Link>
                        <Link href="/contacto" passHref>
                            <FooterLink>Mandanos un mensajito</FooterLink>
                        </Link>
                    </div>
                </FooterContent>
            </div>
        </FooterWrapper>
    );
};

export default Footer;