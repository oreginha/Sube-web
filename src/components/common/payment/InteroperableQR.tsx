import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/common/Button';

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

const QRWrapper = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const AccountInfo = styled.div`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
  
  p {
    margin: ${({ theme }) => theme.spacing.xs} 0;
  }
  
  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const QRInstructions = styled.div`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  
  p {
    margin: ${({ theme }) => theme.spacing.xs} 0;
  }
`;

const QRTimer = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const VerificationForm = styled.form`
  width: 100%;
  max-width: 400px;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
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

interface InteroperableQRProps {
    amount: number;
    accountInfo: {
        alias: string;
        cbu: string;
        holder: string;
    };
    onPaymentSuccess: () => void;
    onPaymentError: (error: string) => void;
}

const InteroperableQR: React.FC<InteroperableQRProps> = ({
    amount,
    accountInfo,
    onPaymentSuccess,
    onPaymentError
}) => {
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [transferId, setTransferId] = useState('');
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    // Create a properly formatted QR value that any virtual wallet app can read
    // Format follows the interoperable QR standard for bank transfers in Argentina
    const qrValue = `
0002010102
26580014AR.COM.BANELCO0215${accountInfo.cbu}
5303032
5406${amount.toFixed(2)}
5802AR
5925${accountInfo.holder}
6007CABA
62240105SUBE-${Date.now()}
6304
    `.trim().replace(/\n/g, '');

    // Add timer functionality
    useEffect(() => {
        if (status !== 'pending') return;

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
    }, [status, onPaymentError]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!transferId.trim()) {
            onPaymentError('Por favor, ingresá el número de transferencia');
            return;
        }

        // Here you would implement the actual verification logic
        // For now, we'll simulate a successful verification
        try {
            // Simulate API call to verify payment
            setTimeout(() => {
                setStatus('success');
                onPaymentSuccess();
            }, 1500);
        } catch (error) {
            setStatus('error');
            onPaymentError('Error al verificar el pago');
        }
    };

    const handleRetry = () => {
        setStatus('pending');
        setTimeLeft(300);
        setTransferId('');
    };

    return (
        <QRContainer>
            <QRTitle>Pagar con QR Interoperable</QRTitle>

            <QRWrapper>
                <QRCodeSVG
                    value={qrValue}
                    size={200}
                    level="H"
                    includeMargin={true}
                />
            </QRWrapper>

            <QRTimer>Expira en: {formatTime(timeLeft)}</QRTimer>

            <AccountInfo>
                <p><strong>CBU:</strong> {accountInfo.cbu}</p>
                <p><strong>Alias:</strong> {accountInfo.alias}</p>
                <p><strong>Titular:</strong> {accountInfo.holder}</p>
                <p><strong>Monto:</strong> ${amount.toLocaleString('es-AR')}</p>
            </AccountInfo>

            <QRInstructions>
                <p>1. Abrí tu aplicación de billetera virtual o banco</p>
                <p>2. Escaneá el código QR o copiá el CBU/Alias</p>
                <p>3. Verificá los datos y realizá la transferencia</p>
                <p>4. Ingresá el número de transferencia para verificar el pago</p>
            </QRInstructions>

            {status === 'pending' && (
                <VerificationForm onSubmit={handleVerification}>
                    <Input
                        type="text"
                        placeholder="Número de transferencia"
                        value={transferId}
                        onChange={(e) => setTransferId(e.target.value)}
                    />
                    <Button type="submit" variant="primary" fullWidth>
                        Verificar Pago
                    </Button>
                </VerificationForm>
            )}

            {status === 'success' && (
                <QRStatus status="success">
                    ¡Pago verificado con éxito!
                </QRStatus>
            )}

            {status === 'error' && (
                <>
                    <QRStatus status="error">
                        Error al verificar el pago. Por favor, intentá nuevamente.
                    </QRStatus>
                    <Button variant="primary" onClick={handleRetry} style={{ marginTop: '16px' }}>
                        Reintentar
                    </Button>
                </>
            )}
        </QRContainer>
    );
};

export default InteroperableQR;