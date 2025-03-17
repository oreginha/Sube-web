import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/common/Header';
import { Button } from '@/components/common/Button';
import { RocketIcon, SportsIcon, GroupIcon } from '@/components/common/icons/CategoryIcons';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const SectionTitle = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 1px;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SectionDescription = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.125rem;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const PlanCard = styled.div<{ selected?: boolean }>`
  background-color: rgba(255, 255, 255, 0.05);
  border: 2px solid ${({ selected, theme }) => selected ? theme.colors.primary : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${({ selected, theme }) => selected ? theme.colors.primary : 'rgba(193, 255, 0, 0.3)'};
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: #000;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  align-items: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
`;

const PlanHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const PlanName = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-align: center;
  background-color: #000;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  display: inline-block;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const PriceInterval = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
`;

const PlanDescription = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin: ${({ theme }) => theme.spacing.md} 0;
  text-align: center;
`;

const IncludesTitle = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: ${({ theme }) => theme.spacing.md} 0 ${({ theme }) => theme.spacing.sm};
`;

const PlanFeatures = styled.ul`
  list-style: none;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  padding: 0;
`;

const PlanFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.white};
  
  &:before {
    content: '✓';
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.sm};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const CTASection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CTATitle = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CTADescription = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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

const PatrocinioPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const sponsorshipPlans = [
    {
      id: 'community',
      name: 'PACK COMUNIDAD',
      icon: <GroupIcon color="#c1ff00" size={48} />,
      price: 0,
      features: [
        'Presencia en web',
        'Presencia en historias destacas',
        'Mención en aire'
      ],
      description: 'Sumás tú proyecto al programa de beneficios de nuestros suscriptores.'
    },
    {
      id: 'basic',
      name: 'PACK BÁSICO',
      icon: <RocketIcon color="#c1ff00" size={48} />,
      price: 10000,
      features: [
        'Pack comunidad',
        'Mención en aire',
        '2 historias semanales'
      ]
    },
    {
      id: 'advanced',
      name: 'PACK AVANZADO',
      icon: <SportsIcon color="#c1ff00" size={48} />,
      price: 20000,
      features: [
        'Pack comunidad',
        'Publicidad No Tradicional',
        '2 historias semanales',
        'Clippeo para tus redes'
      ]
    },
    {
      id: 'exclusive',
      name: 'PACK EXCLUSIVO',
      icon: <RocketIcon color="#c1ff00" size={48} />,
      price: 35000,
      features: [
        'Pack comunidad',
        'Publicidad No Tradicional',
        '2 historias semanales',
        'Clippeo para tus redes',
        'Publicación compartida'
      ]
    }
  ];

  return (
    <PageContainer>
      <Head>
        <title>Patrociná en nuestro canal | SUBE</title>
        <meta name="description" content="Patrociná en nuestro canal y sumá tu proyecto a SUBE" />
      </Head>

      <Header />

      <MainContent>
        <div className="container">
          <SectionTitle>
            Patrociná en nuestro <span>canal</span>
          </SectionTitle>
          <SectionDescription>
            Elegí el plan de patrocinio que mejor se adapte a tus necesidades y sumá tu proyecto a SUBE.
          </SectionDescription>

          <PlansGrid>
            {sponsorshipPlans.map((plan) => (
              <PlanCard 
                key={plan.id} 
                selected={selectedPlan === plan.id}
                onClick={() => handlePlanSelect(plan.id)}
              >
                <IconContainer>
                  {plan.icon}
                </IconContainer>
                <PlanName>{plan.name}</PlanName>
                
                {plan.price > 0 ? (
                  <>
                    <PlanPrice>${plan.price.toLocaleString()}</PlanPrice>
                    <PriceInterval>Mensual</PriceInterval>
                  </>
                ) : (
                  <PlanDescription>{plan.description}</PlanDescription>
                )}
                
                <IncludesTitle>Incluye:</IncludesTitle>
                <PlanFeatures>
                  {plan.features.map((feature, index) => (
                    <PlanFeature key={index}>{feature}</PlanFeature>
                  ))}
                </PlanFeatures>
                
                <Button 
                  variant={selectedPlan === plan.id ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {selectedPlan === plan.id ? 'Plan Seleccionado' : 'Seleccionar Plan'}
                </Button>
              </PlanCard>
            ))}
          </PlansGrid>
          
          {selectedPlan && (
            <CTASection>
              <CTATitle>¿Listo para patrocinar?</CTATitle>
              <CTADescription>
                Has seleccionado el {sponsorshipPlans.find(p => p.id === selectedPlan)?.name}. 
                Hacé click en el botón para continuar con el proceso.
              </CTADescription>
              <Link href="/patrocinio/contacto">
                <Button variant="primary" size="large">
                  Continuar
                </Button>
              </Link>
            </CTASection>
          )}
        </div>
      </MainContent>
      
      <Footer>
        <div className="container">
          <FooterContent>
            <Copyright>© {new Date().getFullYear()} SUBE. Todos los derechos reservados.</Copyright>
            <FooterLinks>
              <Link href="/terminos">
                <FooterLink>Términos y condiciones</FooterLink>
              </Link>
              <Link href="/privacidad">
                <FooterLink>Política de privacidad</FooterLink>
              </Link>
              <Link href="/contacto">
                <FooterLink>Contacto</FooterLink>
              </Link>
            </FooterLinks>
          </FooterContent>
        </div>
      </Footer>
    </PageContainer>
  );
};

export default PatrocinioPage;