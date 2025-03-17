import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/common/Header';
import { Button } from '@/components/common/Button';
import { RootState } from '@/redux/store';
import { selectPlan, setBillingCycle, SubscriptionPlan } from '@/redux/slices/subscriptionSlice';

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

const BillingToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BillingOption = styled.span<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.white};
  font-weight: ${({ active, theme }) => active ? theme.fontWeights.bold : theme.fontWeights.medium};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};
`;

const ToggleSwitch = styled.div`
  width: 50px;
  height: 26px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 13px;
  margin: 0 ${({ theme }) => theme.spacing.sm};
  position: relative;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
`;

const ToggleKnob = styled.div<{ position: 'left' | 'right' }>`
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: ${({ position }) => position === 'left' ? '3px' : '27px'};
  transition: left ${({ theme }) => theme.transitions.fast};
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const PlanCard = styled.div<{ selected: boolean }>`
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

const PlanHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const PlanName = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const PlanPrice = styled.div`
  display: flex;
  align-items: baseline;
`;

const PriceAmount = styled.span`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.white};
`;

const PriceCurrency = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const PriceInterval = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-left: ${({ theme }) => theme.spacing.xs};
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

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.white};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 0;
`;

const SubscriptionPage: React.FC = () => {
  const dispatch = useDispatch();
  const { plans, selectedPlan, billingCycle } = useSelector((state: RootState) => state.subscription);

  const handlePlanSelect = (planId: string) => {
    dispatch(selectPlan(planId));
  };

  const toggleBillingCycle = () => {
    dispatch(setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly'));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <PageContainer>
      <Head>
        <title>Planes de Suscripción | SUBE</title>
        <meta name="description" content="Elegí el plan de suscripción que mejor se adapte a tus necesidades y subite a nuestra comunidad" />
      </Head>

      <Header />

      <MainContent>
        <div className="container">
          <SectionTitle>
            Planes para <span>subirte</span> a la banda
          </SectionTitle>
          <SectionDescription>
            Elegí el plan que más te cope y empezá a disfrutar de todo el contenido exclusivo de SUBE, che. ¡No te quedés afuera!
          </SectionDescription>

          <BillingToggle>
            <BillingOption active={billingCycle === 'monthly'} onClick={() => dispatch(setBillingCycle('monthly'))}>
              Mes a mes
            </BillingOption>
            <ToggleSwitch onClick={toggleBillingCycle}>
              <ToggleKnob position={billingCycle === 'monthly' ? 'left' : 'right'} />
            </ToggleSwitch>
            <BillingOption active={billingCycle === 'annual'} onClick={() => dispatch(setBillingCycle('annual'))}>
              Todo el año (ahorrá guita, ¡un 15%!)
            </BillingOption>
          </BillingToggle>

          <PlansGrid>
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                selected={selectedPlan?.id === plan.id}
                onClick={() => handlePlanSelect(plan.id)}
              >
                <PlanHeader>
                  <PlanName>{plan.name}</PlanName>
                  <PlanPrice>
                    <PriceCurrency>$</PriceCurrency>
                    <PriceAmount>
                      {billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                    </PriceAmount>
                    <PriceInterval>/{billingCycle === 'monthly' ? 'mes' : 'año'}</PriceInterval>
                  </PlanPrice>
                </PlanHeader>

                <PlanFeatures>
                  {plan.features.map((feature, index) => (
                    <PlanFeature key={index}>{feature}</PlanFeature>
                  ))}
                </PlanFeatures>

                <Button
                  variant={selectedPlan?.id === plan.id ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {selectedPlan?.id === plan.id ? 'Plan Seleccionado' : 'Seleccionar Plan'}
                </Button>
              </PlanCard>
            ))}
          </PlansGrid>

          // In the CTASection where you have the "Continuar al pago" button
          {selectedPlan && (
            <CTASection>
              <CTATitle>¿Ya te decidiste?</CTATitle>
              <CTADescription>
                Has elegido el plan {selectedPlan.name} por {formatPrice(billingCycle === 'monthly' ? selectedPlan.price.monthly : selectedPlan.price.annual)}/{billingCycle === 'monthly' ? 'mes' : 'año'}. Dale click al botón para seguir con el pago y subite a la comunidad más piola.
              </CTADescription>
              <Link href="/suscripcion/pago" legacyBehavior>
                <Button variant="primary" size="large">
                  Seguir al pago, dale!
                </Button>
              </Link>
            </CTASection>
          )}

          <CTASection>
            <CTATitle>¿Preferís poner guita una sola vez?</CTATitle>
            <CTADescription>
              Si te copa más hacer una donación única en lugar de suscribirte mes a mes o por todo el año, también podés hacerlo. Cualquier aporte nos viene re bien y nos ayuda a seguir laburando en contenido de calidad como el que le gusta a la pipol de sube.
            </CTADescription>
            <Button variant="outline" size="large">
              Tirar unos mangos
            </Button>
          </CTASection>
        </div>
      </MainContent>

      <Footer>
        <div className="container">
          <FooterContent>
            <Copyright>© {new Date().getFullYear()} SUBE. Todos los derechos reservados, viste?</Copyright>
            <FooterLinks>
              <Link href="/terminos" legacyBehavior>
                <FooterLink>Términos y esas cosas</FooterLink>
              </Link>
              <Link href="/privacidad" legacyBehavior>
                <FooterLink>Privacidad y secretitos</FooterLink>
              </Link>
              <Link href="/contacto" legacyBehavior>
                <FooterLink>Mandanos un mensajito</FooterLink>
              </Link>
            </FooterLinks>
          </FooterContent>
        </div>
      </Footer>
    </PageContainer>
  );
};

export default SubscriptionPage;