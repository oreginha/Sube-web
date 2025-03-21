import React from 'react';
import Head from 'next/head';
import PageContainer from '@/components/layout/PageContainer';
import ContenidosPage from './contenidosIndex';


interface ContenidosProps {
    title?: string;
    description?: string;
}

const Contenidos: React.FC<ContenidosProps> = ({
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
            <ContenidosPage></ContenidosPage>
        </PageContainer>
    );
};

export default Contenidos;