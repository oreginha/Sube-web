import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { InstagramIcon, TikTokIcon, YouTubeIcon, StreamingTagline, HeroSection, StreamingIcon, StreamingText, StreamingRegular, StreamingHighlight, Button, ArrowIcon, Header, SocialIcons, LogoText, LogoWithArrow, LogoWrapper, ButtonGroup, CTASection, CTATitle, CTADescription, Copyright } from '@/components/componentsIndex';
import { WhyJoinSection, BenefitsGrid, BenefitCard, BenefitIcon, BenefitTitle, BenefitDescription, SectionTitle } from '@/components/sections/WhyJoinSection';
import PageContainer from '@/components/layout/PageContainer';
import LogoContainer from '@/components/logo/LogoContainer';
import HeroContent from '@/components/sections/HeroContent';
import SocialIconsContainer from '@/components/social/SocialIconsContainer';
import Footer from '@/components/layout/Footer';

const HomePage: React.FC = () => {
    // Add a state to track if the component is mounted
    const [isMounted, setIsMounted] = useState(false);

    // Use useEffect to set the mounted state after the component mounts
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <PageContainer>
            <Head>
                <title>SUBE </title>
                <meta name="description" content="SUBE" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Only render the content when the component is mounted */}
            {isMounted && (
                <>
                    <HeroSection>
                        <div className="container">
                            <HeroContent>
                                <LogoContainer>
                                    <StreamingTagline>
                                        <StreamingIcon src="/images/icons-svg/2.svg" alt="Streaming Icon" />
                                        <StreamingText>
                                            <StreamingRegular>UN </StreamingRegular>
                                            <StreamingHighlight>STREAMING </StreamingHighlight>
                                            <StreamingRegular>PLATENSE</StreamingRegular>
                                        </StreamingText>
                                    </StreamingTagline>

                                    <LogoWrapper>
                                        <LogoWithArrow>
                                            <LogoText>SUBE</LogoText>
                                            <ArrowIcon
                                                useImage={true}
                                                heightPercentage={150}
                                                style={{
                                                    position: 'relative',
                                                    top: '5px'
                                                }}
                                            />
                                        </LogoWithArrow>
                                        <SocialIconsContainer bottomPosition="-55px"
                                            rightPosition="-20px"
                                            mobileBottomPosition="-50px">
                                            <SocialIcons href="https://instagram.com/sube" target="_blank" rel="noopener noreferrer">
                                                <InstagramIcon />
                                            </SocialIcons>
                                            <SocialIcons href="https://youtube.com/sube" target="_blank" rel="noopener noreferrer">
                                                <YouTubeIcon />
                                            </SocialIcons>
                                            <SocialIcons href="https://tiktok.com/sube" target="_blank" rel="noopener noreferrer">
                                                <TikTokIcon />
                                            </SocialIcons>
                                        </SocialIconsContainer>
                                    </LogoWrapper>
                                </LogoContainer>

                                <ButtonGroup>
                                    <Link href="/contenidos">
                                        <Button variant="outline" size="large">Chusmear contenidos</Button>
                                    </Link>
                                </ButtonGroup>
                            </HeroContent>
                        </div>
                    </HeroSection>

                    <WhyJoinSection>
                        <div className="container">
                            <SectionTitle>¿Por qué <span>subirte</span> a nuestra banda?</SectionTitle>
                            <BenefitsGrid>
                                <BenefitCard>
                                    <BenefitIcon>
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                        </svg>
                                    </BenefitIcon>
                                    <BenefitTitle>Comunidad de es Activos</BenefitTitle>
                                    <BenefitDescription>
                                        Formá parte de una comunidad de gente copada con tus mismos intereses y metete en debates y eventos exclusivos mientras tomamos mate.
                                    </BenefitDescription>
                                </BenefitCard>
                                <BenefitCard>
                                    <BenefitIcon>
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                        </svg>
                                    </BenefitIcon>
                                    <BenefitTitle>Descuentos para Ahorrar Guita</BenefitTitle>
                                    <BenefitDescription>
                                        Conseguí descuentos en eventos, merchandising y productos de nuestros socios para que no gastes tanta guita.
                                    </BenefitDescription>
                                </BenefitCard>
                                <BenefitCard>
                                    <BenefitIcon>
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    </BenefitIcon>
                                    <BenefitTitle>Ayudá a los Creadores a Laburar</BenefitTitle>
                                    <BenefitDescription>
                                        Tu suscripción ayuda directamente a los creadores a seguir laburando y produciendo contenido de calidad como Messi.
                                    </BenefitDescription>
                                </BenefitCard>
                            </BenefitsGrid>
                        </div>
                    </WhyJoinSection>

                    <CTASection>
                        <div className="container">
                            <CTATitle>¿Qué estás esperando?</CTATitle>
                            <CTADescription>
                                subite ahora y empezá a disfrutar de todos los beneficios que SUBE tiene para vos. Elegí el plan que más te cope y unite a nuestra comunidad de pibes y pibas que la rompen.
                            </CTADescription>
                            <Link href="/suscripcion">
                                <Button variant="secondary" size="large">Mirá los planes, son una birra</Button>
                            </Link>
                        </div>
                    </CTASection>
                </>
            )}
        </PageContainer>
    );
};

export default HomePage;