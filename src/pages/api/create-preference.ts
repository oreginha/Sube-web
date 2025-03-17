import { NextRequest, NextResponse } from 'next/server';
// Fix the import - use the correct SDK approach
const mercadopago = require('mercadopago');

export async function POST(req: NextRequest) {
    // Skip validation during build time
    if (process.env.NODE_ENV === 'production' && !req) {
        return new Response('Build time - skipping execution');
    }
    
    try {
        const body = await req.json();
        console.log("Received payment request with body:", JSON.stringify(body, null, 2));

        // Add email validation before sending to Mercado Pago
        const isValidEmail = (email: string) => {
            if (!email || typeof email !== 'string') return false;
            // More strict email validation that matches Mercado Pago's requirements
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        };

        // Validate payer email - only if we have a body
        if (body && (!body.payer || !body.payer.email)) {
            console.error("Missing payer or payer email");
            return NextResponse.json({
                error: 'Missing payer information',
                message: 'Please provide payer information including email'
            }, { status: 400 });
        }

        // Only proceed with validation if we have a body with payer
        if (body && body.payer) {
            // Clean and validate the email
            const cleanedEmail = (body.payer.email || '').toString().trim().toLowerCase();
            console.log(`Original email: "${body.payer.email}", Cleaned email: "${cleanedEmail}"`);
            
            if (!isValidEmail(cleanedEmail)) {
                console.error(`Invalid email format: "${cleanedEmail}"`);
                return NextResponse.json({
                    error: 'Invalid email address format',
                    message: 'Please provide a valid email address'
                }, { status: 400 });
            }

            // Create preference object for Mercado Pago
            const preferenceData = {
                items: [
                    {
                        id: body.id || 'subscription-item',
                        title: body.title || 'SUBE Canal Subscription',
                        quantity: 1,
                        unit_price: Number(body.price) || 0,
                        currency_id: 'ARS',
                    }
                ],
                payer: {
                    email: cleanedEmail,
                    name: body.payer.name || 'Subscriber',
                    identification: body.payer.identification || { type: 'DNI', number: '00000000' }
                },
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
                    failure: `${process.env.NEXT_PUBLIC_SITE_URL}/failure`,
                    pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pending`
                },
                auto_return: 'approved',
                statement_descriptor: 'SUBE Canal',
                external_reference: body.external_reference || '',
            };

            console.log("Creating preference with data:", JSON.stringify(preferenceData, null, 2));

            // Configure Mercado Pago with access token
            mercadopago.configure({
                access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
            });
            
            // Create the preference
            const response = await mercadopago.preferences.create(preferenceData);
            console.log("Mercado Pago preference created successfully");

            // Return the preference ID and init point
            return NextResponse.json({
                id: response.body.id,
                init_point: response.body.init_point
            });
        }
        
        // Default response if we don't have a body
        return NextResponse.json({ message: 'No payment data provided' }, { status: 400 });

    } catch (error: any) {
        console.error('Error creating preference:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return NextResponse.json({
            error: error.message || 'Error creating payment preference',
            details: error.stack
        }, { status: 500 });
    }
}