import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import PageContainer from './PageContainer';
import Head from 'next/head';

interface RootLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

/**
 * RootLayout component that serves as the main layout wrapper for the application.
 * This component doesn't reload when navigating between pages, only the children content changes.
 */
const RootLayout: React.FC<RootLayoutProps> = ({
    children,
    title = 'SUBE',
    description = 'SUBE - Un streaming platense'
}) => {
    return (
        <PageContainer>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </PageContainer>
    );
};

export default RootLayout;