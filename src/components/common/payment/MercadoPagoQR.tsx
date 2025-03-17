import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { Button } from '@/components/common/Button';
// Import the mercadopago SDK properly
// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Initialize the SDK with your public key
initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || '');

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({
    accessToken: process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN || '',
    options: {
        timeout: 5000,
        idempotencyKey: 'abc'
    }
});

// Step 3: Initialize the API object
const payment = new Payment(client);

// Step 4: Create the request object
const body = {
    transaction_amount: 12.34,
    description: '<DESCRIPTION>',
    payment_method_id: '<PAYMENT_METHOD_ID>',
    payer: {
        email: '<EMAIL>'
    },
};

// Step 5: Create request options object - Optional
const requestOptions = {
    idempotencyKey: '<IDEMPOTENCY_KEY>',
};

// Step 6: Make the request
payment.create({ body, requestOptions }).then(console.log).catch(console.log);

const QRContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const QRTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const QRCode = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const QRInstructions = styled.div`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`;

const QRTimer = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const QRStatus = styled.div<{ status: 'pending' | 'success' | 'error' }>`
  color: ${({ status, theme }) =>
        status === 'success' ? theme.colors.success :
            status === 'error' ? theme.colors.error :
                theme.colors.primary
    };
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

interface MercadoPagoQRProps {
    amount: number;
    description: string;
    onPaymentSuccess: () => void;
    onPaymentError: (error: string) => void;
}

const MercadoPagoQR: React.FC<MercadoPagoQRProps> = ({
    amount,
    description,
    onPaymentSuccess,
    onPaymentError
}) => {
    const [qrData, setQrData] = useState<string | null>(null);
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    // Generate QR code when component mounts
    useEffect(() => {
        const generateQR = async () => {
            try {
                // Create a payment request
                const paymentData = {
                    transaction_amount: amount,
                    description: description,
                    payment_method_id: 'qr',
                    payer: {
                        email: 'customer@example.com' // In a real app, this would be the user's email
                    }
                };

                // Simulate QR generation (in a real app, this would call the Mercado Pago API)
                // For demo purposes, we're using a timeout to simulate the API call
                setTimeout(() => {
                    // Generate SVG QR code using qrcode.react
                    const qrValue = JSON.stringify({
                        id: 'mp-' + Date.now(),
                        amount: amount,
                        description: description,
                        timestamp: new Date().toISOString()
                    });

                    // Create an SVG QR code
                    const qrSvg = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="200" fill="white"/>
                        <text x="100" y="100" text-anchor="middle" fill="black">QR Mercado Pago</text>
                        <text x="100" y="120" text-anchor="middle" fill="black">${amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</text>
                    </svg>`;

                    setQrData(qrSvg);

                    // Simulate payment status checking
                    const checkPaymentStatus = setInterval(() => {
                        // In a real app, this would call the Mercado Pago API to check payment status
                        // For demo purposes, we'll simulate a successful payment after a random time
                        if (Math.random() > 0.995) { // Very low probability to simulate a long wait
                            clearInterval(checkPaymentStatus);
                            setStatus('success');
                            onPaymentSuccess();
                        }
                    }, 2000);

                    // Clean up interval on component unmount
                    return () => clearInterval(checkPaymentStatus);
                }, 1000);
            } catch (error) {
                console.error('Error generating QR code:', error);
                setStatus('error');
                onPaymentError('Error al generar el código QR');
            }
        };

        if (!qrData && status === 'pending') {
            generateQR();
        }
    }, [amount, description, onPaymentError, onPaymentSuccess, qrData, status]);

    useEffect(() => {
        if (!qrData || status !== 'pending') return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setStatus('error');
                    onPaymentError('El código QR ha expirado');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [qrData, status, onPaymentError]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleRetry = () => {
        setStatus('pending');
        setTimeLeft(300);
        setQrData(null);
    };

    return (
        <QRContainer>
            <QRTitle>Pagar con Mercado Pago</QRTitle>

            {status === 'pending' && qrData && (
                <>
                    <QRCode dangerouslySetInnerHTML={{ __html: qrData }} />
                    <QRTimer>Expira en: {formatTime(timeLeft)}</QRTimer>
                    <QRInstructions>
                        <p>1. Abrí la app de Mercado Pago</p>
                        <p>2. Tocá en "Pagar con QR"</p>
                        <p>3. Escaneá el código y confirmá el pago</p>
                    </QRInstructions>
                    <QRStatus status="pending">Esperando pago...</QRStatus>
                </>
            )}

            {status === 'success' && (
                <>
                    <QRStatus status="success">¡Pago recibido con éxito!</QRStatus>
                </>
            )}

            {status === 'error' && (
                <>
                    <QRStatus status="error">
                        Error al procesar el pago. Por favor, intentá nuevamente.
                    </QRStatus>
                    <Button variant="primary" onClick={handleRetry}>
                        Reintentar
                    </Button>
                </>
            )}
        </QRContainer>
    );
};

export default MercadoPagoQR;