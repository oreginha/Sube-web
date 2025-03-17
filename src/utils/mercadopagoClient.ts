import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

// Configuración centralizada de Mercado Pago
export const mercadoPagoClient = new MercadoPagoConfig({
    accessToken: process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN || '',
    options: {
        timeout: 5000,
        idempotencyKey: 'abc'
    }
});

// Exportamos los servicios que necesitamos
export const preferenceService = new Preference(mercadoPagoClient);
export const paymentService = new Payment(mercadoPagoClient);