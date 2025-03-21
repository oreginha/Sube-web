import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/layout/Header';
import { Button } from '@/components/common/Button';
import { RootState } from '@/redux/store';
import { selectPlan, setBillingCycle } from '@/redux/slices/subscriptionSlice';
import {
  MainContent,
  SectionTitle,
  SectionDescription,
  PlanCard,
  PlanHeader,
  PlanName,
  PlanPrice,
  PlansGrid,
  BillingToggle,
  BillingOption,
  ToggleSwitch,
  ToggleKnob,
  PriceAmount,
  PriceCurrency,
  PriceInterval,
  PlanFeatures,
  PlanFeature,
  CTASection,
  CTATitle,
  CTADescription
} from '@/components/componentsIndex';
import PageContainer from '@/components/layout/PageContainer';

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
    </PageContainer>
  );
};

export default SubscriptionPage;