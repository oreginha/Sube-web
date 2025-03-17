import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const QROptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const QROptionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const QROptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const QROptionCard = styled.div<{ selected: boolean }>`
  background-color: rgba(255, 255, 255, 0.05);
  border: 2px solid ${({ selected, theme }) => selected ? theme.colors.primary : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${({ selected, theme }) => selected ? theme.colors.primary : 'rgba(193, 255, 0, 0.3)'};
  }
`;

const QROptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const QROptionInfo = styled.div`
  flex: 1;
`;

const QROptionName = styled.h4`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const QROptionDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  margin: 0;
`;

export type QRPaymentMethod = 'mercadopago' | 'cuentadni';

interface PaymentQROptionProps {
    selectedMethod: QRPaymentMethod | null;
    onMethodSelect: (method: QRPaymentMethod) => void;
}

const PaymentQROption: React.FC<PaymentQROptionProps> = ({ selectedMethod, onMethodSelect }) => {
    return (
        <QROptionContainer>
            <QROptionTitle>Seleccionar método de pago QR</QROptionTitle>
            <QROptionsGrid>
                <QROptionCard
                    selected={selectedMethod === 'mercadopago'}
                    onClick={() => onMethodSelect('mercadopago')}
                >
                    <QROptionContent>
                        <Image
                            src="/images/mercadopago-logo.svg"
                            alt="Mercado Pago"
                            width={40}
                            height={40}
                        />
                        <QROptionInfo>
                            <QROptionName>Mercado Pago</QROptionName>
                            <QROptionDescription>Pago instantáneo con QR dinámico</QROptionDescription>
                        </QROptionInfo>
                    </QROptionContent>
                </QROptionCard>

                <QROptionCard
                    selected={selectedMethod === 'cuentadni'}
                    onClick={() => onMethodSelect('cuentadni')}
                >
                    <QROptionContent>
                        <Image
                            src="/images/cuentadni-logo.svg"
                            alt="CuentaDNI"
                            width={40}
                            height={40}
                        />
                        <QROptionInfo>
                            <QROptionName>CuentaDNI</QROptionName>
                            <QROptionDescription>Transferencia bancaria con QR</QROptionDescription>
                        </QROptionInfo>
                    </QROptionContent>
                </QROptionCard>
            </QROptionsGrid>
        </QROptionContainer>
    );
};

export default PaymentQROption;