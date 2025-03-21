import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { logger } from '@/utils/logger';
import {
  CTATitle,
  CTADescription,
  CTASection,
  SectionTitle,
  PlanHeader,
  PlanName,
  PlanPrice,
  PriceInterval,
  PlanDescription,
  IncludesTitle,
  PlanFeatures,
  PlanFeature,
  IconContainer,
  PlansGrid,
} from '@/components/componentsIndex';
// Define the content item type
interface ContentItem {
  title: string;
  url: string;
  description: string;
  embed_code: string;
  category?: string; // Make category optional to match existing data
}

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const SectionDescription = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.125rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const VideoCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const VideoInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const VideoTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: 1.25rem;
`;

const VideoDescription = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 0.875rem;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CategoryTab = styled.button<{ $active: boolean }>`
  background-color: ${({ $active, theme }) => $active ? theme.colors.primary : 'rgba(255, 255, 255, 0.1)'};
  color: ${({ $active, theme }) => $active ? theme.colors.secondary : theme.colors.white};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ $active, theme }) => $active ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)'};
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

const FooterLink = styled.span`
  color: ${({ theme }) => theme.colors.white};
  transition: color ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 0;
`;

const RefreshButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ContenidosPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<string>('');
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);

  const loadVideos = async () => {
    try {
      logger.info('Manual refresh triggered by user');
      setLoading(true);
      setError(null);

      const response = await fetch('/data/content.json');
      if (!response.ok) {
        throw new Error('Failed to fetch content data');
      }
      const data = await response.json();
      setContentItems(data);

      setLastRefresh(new Date().toLocaleTimeString());
      logger.info(`Videos refreshed successfully at ${new Date().toLocaleTimeString()}`);
    } catch (err) {
      logger.error('Error loading videos:', err);
      setError('No se pudieron cargar los videos. Por favor, intentá más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    logger.info('Content page mounted, loading videos');
    loadVideos();
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleRefresh = () => {
    loadVideos();
  };

  // Filter videos by category if category exists
  const filteredVideos = activeCategory === 'todos'
    ? contentItems
    : contentItems.filter(video => video.category === activeCategory);

  return (
    <PageContainer>
      <Head>
        <title>Contenidos | SUBE</title>
        <meta name="description" content="Explora nuestros contenidos exclusivos de SUBE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent>
        <div className="container">
          <SectionTitle>
            Nuestros <span>Contenidos</span>
          </SectionTitle>

          <SectionDescription>
            Explora nuestra colección de videos exclusivos con contenido de alta calidad para nuestros socios.
          </SectionDescription>

          <RefreshButtonContainer>
            <Button
              variant="primary"
              size="medium"
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Actualizar Contenidos'}
            </Button>
            {lastRefresh && (
              <span style={{ color: 'white', marginLeft: '10px', alignSelf: 'center' }}>
                Última actualización: {lastRefresh}
              </span>
            )}
          </RefreshButtonContainer>

          <CategoryTabs>
            <CategoryTab
              $active={activeCategory === 'todos'}
              onClick={() => handleCategoryChange('todos')}
            >
              Todos
            </CategoryTab>
            <CategoryTab
              $active={activeCategory === 'tutoriales'}
              onClick={() => handleCategoryChange('tutoriales')}
            >
              Tutoriales
            </CategoryTab>
            <CategoryTab
              $active={activeCategory === 'entrevistas'}
              onClick={() => handleCategoryChange('entrevistas')}
            >
              Entrevistas
            </CategoryTab>
            <CategoryTab
              $active={activeCategory === 'eventos'}
              onClick={() => handleCategoryChange('eventos')}
            >
              Eventos
            </CategoryTab>
          </CategoryTabs>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'white' }}>Cargando videos...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'white' }}>{error}</p>
            </div>
          ) : (
            <ContentGrid>
              {filteredVideos.map((video, index) => (
                <VideoCard key={index}>
                  <VideoContainer>
                    {video.embed_code ? (
                      <div dangerouslySetInnerHTML={{ __html: video.embed_code }} />
                    ) : (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)'
                      }}>
                        <p style={{ color: 'white', textAlign: 'center' }}>
                          Vista previa no disponible
                        </p>
                      </div>
                    )}
                  </VideoContainer>
                  <VideoInfo>
                    <VideoTitle>{video.title}</VideoTitle>
                    <VideoDescription>
                      {video.description}
                    </VideoDescription>
                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="small">Ver completo</Button>
                    </a>
                  </VideoInfo>
                </VideoCard>
              ))}
            </ContentGrid>
          )}

          <CTASection>
            <CTATitle>¿Querés acceder a más contenido exclusivo?</CTATitle>
            <CTADescription>
              Hacete socio hoy mismo y disfrutá de acceso ilimitado a todos nuestros contenidos premium, eventos exclusivos y mucho más.
            </CTADescription>
            <Link href="/suscripcion">
              <Button variant="primary" size="large">Asociate Ahora</Button>
            </Link>
          </CTASection>
        </div>
      </MainContent>

      <Footer>
        <div className="container">
          <FooterContent>
            <Copyright>© {new Date().getFullYear()} SUBE. Todos los derechos reservados.</Copyright>
            <FooterLinks>
              <Link href="/">
                <FooterLink>Inicio</FooterLink>
              </Link>
              <Link href="/contenidos">
                <FooterLink>Contenidos</FooterLink>
              </Link>
              <Link href="/patrocinio">
                <FooterLink>Patrociná</FooterLink>
              </Link>
              <Link href="/suscripcion">
                <FooterLink>Suscripción</FooterLink>
              </Link>
            </FooterLinks>
          </FooterContent>
        </div>
      </Footer>
    </PageContainer>
  );
};



export default ContenidosPage;

// Find any styled components with active prop and update them
const FilterButton = styled.button<{ $active: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.secondary : theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'rgba(193, 255, 0, 0.1)'};
  }
`;

