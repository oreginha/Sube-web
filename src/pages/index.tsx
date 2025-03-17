import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Header from '@/components/common/Header';
import { Button } from '@/components/common/Button';
import Link from 'next/link';

// Add PageContainer component
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeroSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const HeroTitle = styled.h1`
  @font-face {
  font-family: 'Wild World Bold';
  src: url('../assets/fonts/WildWorldBold.otf') format('otf');
  font-weight: bold;
  font-style: normal;
  font-display: swap; /* Mejora el rendimiento de carga */
}

@font-face {
  font-family: 'Bizmo';
  src: url('../assets/fonts/Bizmo-Black.otf') format('otf');
  font-weight: 900; /* Black */
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Bizmo';
  src: url('../assets/fonts/Bizmo-ExtraBold.otf') format('otf');
  font-weight: 800; /* ExtraBold */
  font-style: normal;
  font-display: swap;
}

  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 2px;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.125rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const WhyJoinSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 1px;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: transform ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const BenefitTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

const BenefitDescription = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0;
`;

const CTASection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background-color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const CTATitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CTADescription = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Footer = styled.footer`
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

const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

// Change from styled.a to styled.span
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

const HomePage: React.FC = () => {
  // Add a state to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // Use useEffect to set the mounted state after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <PageContainer>
      <Head>
        <title>SUBE </title>
        <meta name="description" content="SUBE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Only render the content when the component is mounted */}
      {isMounted && (
        <>
          <Header />

          <HeroSection>
            <div className="container">
              <HeroContent>
                <HeroTitle>
                  Bienvenido a <span>SUBE</span>, tu canal de streaming más piola
                </HeroTitle>
                <HeroSubtitle>
                  Un espacio donde encontrarás contenido exclusivo, bien nacional y popular, con un estilo re canchero y descontracturado para los que laburan todo el día y quieren morfar algo rico mientras miran fulbo.
                </HeroSubtitle>
                {/* Update the ButtonGroup section */}
                <ButtonGroup>
                  <Link href="/suscripcion">
                    <Button variant="primary" size="large">subite </Button>
                  </Link>
                  <Link href="/contenidos">
                    <Button variant="outline" size="large">Chusmear contenidos</Button>
                  </Link>
                </ButtonGroup>
              </HeroContent>
            </div>
          </HeroSection>

          <WhyJoinSection>
            <div className="container">
              <SectionTitle>¿Por qué <span>subirte</span> a nuestra banda?</SectionTitle>
              <BenefitsGrid>
                <BenefitCard>
                  <BenefitIcon>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </BenefitIcon>
                  <BenefitTitle>Contenido Exclusivo y Copado</BenefitTitle>
                  <BenefitDescription>
                    Accedé a contenido que no vas a encontrar ni a palos en otro lado, hecho especialmente para les pibis de nuestra comunidad.
                  </BenefitDescription>
                </BenefitCard>

                <BenefitCard>
                  <BenefitIcon>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </BenefitIcon>
                  <BenefitTitle>Comunidad de es Activos</BenefitTitle>
                  <BenefitDescription>
                    Formá parte de una comunidad de gente copada con tus mismos intereses y metete en debates y eventos exclusivos mientras tomamos mate.
                  </BenefitDescription>
                </BenefitCard>

                <BenefitCard>
                  <BenefitIcon>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                  </BenefitIcon>
                  <BenefitTitle>Mirá Todo Antes que Nadie</BenefitTitle>
                  <BenefitDescription>
                    Chusmea los contenidos antes que el resto y accedé a estrenos exclusivos para los que ponen la guita en la suscripción.
                  </BenefitDescription>
                </BenefitCard>

                <BenefitCard>
                  <BenefitIcon>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                    </svg>
                  </BenefitIcon>
                  <BenefitTitle>Descuentos para Ahorrar Guita</BenefitTitle>
                  <BenefitDescription>
                    Conseguí descuentos en eventos, merchandising y productos de nuestros socios para que no gastes tanta guita.
                  </BenefitDescription>
                </BenefitCard>

                <BenefitCard>
                  <BenefitIcon>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </BenefitIcon>
                  <BenefitTitle>Sin Publicidades Molestas</BenefitTitle>
                  <BenefitDescription>
                    Disfrutá de todo el contenido sin que te interrumpan con publicidades mientras estás viendo fulbo o morfando un asado.
                  </BenefitDescription>
                </BenefitCard>

                <BenefitCard>
                  <BenefitIcon>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </BenefitIcon>
                  <BenefitTitle>Ayudá a los Creadores a Laburar</BenefitTitle>
                  <BenefitDescription>
                    Tu suscripción ayuda directamente a los creadores a seguir laburando y produciendo contenido de calidad como Messi.
                  </BenefitDescription>
                </BenefitCard>
              </BenefitsGrid>
            </div>
          </WhyJoinSection>

          <CTASection>
            <div className="container">
              <CTATitle>¿Qué estás esperando?</CTATitle>
              <CTADescription>
                subite ahora y empezá a disfrutar de todos los beneficios que SUBE tiene para vos. Elegí el plan que más te cope y unite a nuestra comunidad de pibes y pibas que la rompen.
              </CTADescription>
              <Link href="/suscripcion">
                <Button variant="secondary" size="large">Mirá los planes, son una birra</Button>
              </Link>
            </div>
          </CTASection>

          <Footer>
            <div className="container">
              <FooterContent>
                <Copyright>© {new Date().getFullYear()} SUBE. Todos los derechos reservados, viste?</Copyright>
                <FooterLinks>
                  <Link href="/terminos" passHref>
                    <FooterLink>Términos y esas cosas</FooterLink>
                  </Link>
                  <Link href="/privacidad" passHref>
                    <FooterLink>Privacidad y secretitos</FooterLink>
                  </Link>
                  <Link href="/contacto" passHref>
                    <FooterLink>Mandanos un mensajito</FooterLink>
                  </Link>
                </FooterLinks>
              </FooterContent>
            </div>
          </Footer>
        </>
      )}
    </PageContainer>
  );
};

export default HomePage;