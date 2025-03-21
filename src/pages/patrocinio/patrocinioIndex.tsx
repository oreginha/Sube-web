import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { RocketIcon, SportsIcon, GroupIcon } from '@/components/icons/CategoryIcons';
import {
  CTATitle,
  CTADescription,
  CTASection,
  SectionTitle,
  PlanHeader,
  PlanName,
  PlanPrice,
  PriceInterval,
  PlanDescription,
  IncludesTitle,
  PlanFeatures,
  PlanFeature,
  IconContainer,
  PlansGrid,
  PlanCard,
  Copyright,
  MainContent,
  SectionDescription
} from '@/components/componentsIndex';
import PageContainer from '@/components/layout/PageContainer';


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
    </PageContainer>
  );
};

export default PatrocinioPage;