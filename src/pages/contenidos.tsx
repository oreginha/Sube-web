import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Header from '@/components/common/Header';
import { Button } from '@/components/common/Button';
import Link from 'next/link';

// Define the content item type
interface ContentItem {
  title: string;
  url: string;
  description: string;
  embed_code: string;
}

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ContentSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ContentThumbnail = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  background-color: ${({ theme }) => theme.colors.secondary};
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const ContentInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const ContentTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1.1rem;
`;

const ContentDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LoadingMessage = styled.div`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: 1.2rem;
`;

// Helper function to extract YouTube video ID
const getYoutubeVideoId = (url: string): string => {
  // Handle regular YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return match[2];
  }
  
  // Handle YouTube clip URLs
  const clipRegExp = /^.*(youtube.com\/clip\/)([^#&?]*).*/;
  const clipMatch = url.match(clipRegExp);
  
  if (clipMatch && clipMatch[2]) {
    return url; // For clips, we'll use the full URL
  }
  
  return '';
};

const ContenidosPage: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/data/content.json');
        if (!response.ok) {
          throw new Error('Failed to fetch content data');
        }
        const data = await response.json();
        setContentItems(data);
        setLoading(false);
      } catch (err) {
        setError('Error loading content. Please try again later.');
        setLoading(false);
        console.error('Error fetching content:', err);
      }
    };

    fetchContent();
  }, []);

  return (
    <PageContainer>
      <Head>
        <title>Contenidos | SUBE</title>
        <meta name="description" content="Explora nuestros contenidos exclusivos" />
      </Head>

      {isMounted && (
        <>
          <Header />
          
          <ContentSection>
            <div className="container">
              <SectionTitle>Nuestros <span>contenidos</span></SectionTitle>
              
              {loading && <LoadingMessage>Cargando contenidos...</LoadingMessage>}
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              {!loading && !error && (
                <ContentGrid>
                  {contentItems.map((item, index) => (
                    <ContentCard key={index}>
                      <ContentThumbnail>
                        {item.embed_code ? (
                          <div dangerouslySetInnerHTML={{ __html: item.embed_code }} />
                        ) : (
                          <div style={{ 
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
                      </ContentThumbnail>
                      <ContentInfo>
                        <ContentTitle>{item.title}</ContentTitle>
                        <ContentDescription>{item.description}</ContentDescription>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="small">Ver completo</Button>
                        </a>
                      </ContentInfo>
                    </ContentCard>
                  ))}
                </ContentGrid>
              )}
            </div>
          </ContentSection>
        </>
      )}
    </PageContainer>
  );
};

export default ContenidosPage;