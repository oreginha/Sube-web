import React from 'react';
import Head from 'next/head';
import PageContainer from '@/components/layout/PageContainer';
import PatrocinioPage from './patrocinioIndex';


interface PatrocinioProps {
    title?: string;
    description?: string;
}

const Patrocinio: React.FC<PatrocinioProps> = ({
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
            <PatrocinioPage></PatrocinioPage>
        </PageContainer>
    );
};

export default Patrocinio;