import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from '@/components/common/Header';
import { Button } from '@/components/common/Button';
import { RootState } from '@/redux/store';
import { MoneyIcon } from '@/components/common/icons/CategoryIcons';

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

const PaymentContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Input = styled(Field)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
`;

const OrderSummary = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.white};
`;

const SummaryTotal = styled(SummaryItem)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.125rem;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  span:last-child {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  
  svg {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
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

// Validation schema for the payment form
const PaymentSchema = Yup.object().shape({
  cardName: Yup.string().required('El nombre es obligatorio'),
  cardNumber: Yup.string()
    .required('El número de tarjeta es obligatorio')
    .matches(/^[0-9]{16}$/, 'El número de tarjeta debe tener 16 dígitos'),
  expiryMonth: Yup.string()
    .required('El mes es obligatorio')
    .matches(/^(0[1-9]|1[0-2])$/, 'Mes inválido'),
  expiryYear: Yup.string()
    .required('El año es obligatorio')
    .matches(/^[0-9]{2}$/, 'Año inválido'),
  cvv: Yup.string()
    .required('El código de seguridad es obligatorio')
    .matches(/^[0-9]{3,4}$/, 'Código de seguridad inválido'),
});

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const { selectedPlan, billingCycle } = useSelector((state: RootState) => state.subscription);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // If no plan is selected, redirect to subscription page
  React.useEffect(() => {
    if (!selectedPlan) {
      router.push('/suscripcion');
    }
  }, [selectedPlan, router]);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      setSubmitting(false);
    }, 1500);
  };
  
  if (!selectedPlan) {
    return null; // Will redirect in useEffect
  }
  
  const planPrice = billingCycle === 'monthly' ? selectedPlan.price.monthly : selectedPlan.price.annual;
  
  return (
    <PageContainer>
      <Head>
        <title>Pago de Suscripción | SUBE</title>
        <meta name="description" content="Completá tu suscripción a SUBE" />
      </Head>
      
      <Header />
      
      <MainContent>
        <div className="container">
          <SectionTitle>
            Completar <span>Pago</span>
          </SectionTitle>
          
          {!paymentSuccess ? (
            <>
              <SectionDescription>
                Estás a un paso de formar parte de la comunidad SUBE. Completá los datos de pago para finalizar tu suscripción.
              </SectionDescription>
              
              <PaymentContainer>
                <Formik
                  initialValues={{
                    cardName: '',
                    cardNumber: '',
                    expiryMonth: '',
                    expiryYear: '',
                    cvv: '',
                  }}
                  validationSchema={PaymentSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                        <Input type="text" id="cardName" name="cardName" placeholder="Nombre completo" />
                        <ErrorMessage name="cardName" component={ErrorText} />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="cardNumber">Número de tarjeta</Label>
                        <Input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" />
                        <ErrorMessage name="cardNumber" component={ErrorText} />
                      </FormGroup>
                      
                      <CardGrid>
                        <FormGroup>
                          <Label>Fecha de vencimiento</Label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ flex: 1 }}>
                              <Input type="text" name="expiryMonth" placeholder="MM" />
                              <ErrorMessage name="expiryMonth" component={ErrorText} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <Input type="text" name="expiryYear" placeholder="AA" />
                              <ErrorMessage name="expiryYear" component={ErrorText} />
                            </div>
                          </div>
                        </FormGroup>
                        
                        <FormGroup>
                          <Label htmlFor="cvv">Código de seguridad</Label>
                          <Input type="text" id="cvv" name="cvv" placeholder="123" />
                          <ErrorMessage name="cvv" component={ErrorText} />
                        </FormGroup>
                      </CardGrid>
                      
                      <OrderSummary>
                        <h3 style={{ color: 'white', marginBottom: '16px' }}>Resumen de la orden</h3>
                        
                        <SummaryItem>
                          <span>Plan {selectedPlan.name}</span>
                          <span>{formatPrice(planPrice)}</span>
                        </SummaryItem>
                        
                        <SummaryItem>
                          <span>Período</span>
                          <span>{billingCycle === 'monthly' ? 'Mensual' : 'Anual'}</span>
                        </SummaryItem>
                        
                        <SummaryTotal>
                          <span>Total</span>
                          <span>{formatPrice(planPrice)}</span>
                        </SummaryTotal>
                      </OrderSummary>
                      
                      <Button 
                        type="submit" 
                        variant="primary" 
                        fullWidth 
                        disabled={isSubmitting}
                        style={{ marginTop: '24px' }}
                      >
                        {isSubmitting ? 'Procesando...' : 'Completar Pago'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </PaymentContainer>
            </>
          ) : (
            <PaymentContainer>
              <SuccessMessage>
                <MoneyIcon size={64} />
                <h2>¡Pago completado con éxito!</h2>
                <p>
                  Gracias por suscribirte a SUBE. Tu suscripción al plan {selectedPlan.name} ha sido activada correctamente.
                  Ahora podés disfrutar de todos los beneficios exclusivos de nuestra comunidad.
                </p>
                <Button variant="primary" onClick={() => router.push('/')}>
                  Volver al inicio
                </Button>
              </SuccessMessage>
            </PaymentContainer>
          )}
        </div>
      </MainContent>
      
      <Footer>
        <div className="container">
          <FooterContent>
            <Copyright>© {new Date().getFullYear()} SUBE. Todos los derechos reservados.</Copyright>
            <FooterLinks>
              <Link href="/terminos" passHref>
                <FooterLink>Términos y condiciones</FooterLink>
              </Link>
              <Link href="/privacidad" passHref>
                <FooterLink>Política de privacidad</FooterLink>
              </Link>
              <Link href="/contacto" passHref>
                <FooterLink>Contacto</FooterLink>
              </Link>
            </FooterLinks>
          </FooterContent>
        </div>
      </Footer>
    </PageContainer>
  );
};

export default PaymentPage;