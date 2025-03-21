import styled from 'styled-components';

export const StreamingTagline = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  align-self: flex-start;
  margin-left: 90px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
    align-self: center;
    margin-bottom: 20px;
  }
`;

export const StreamingIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

export const StreamingText = styled.span`
  font-family: 'Bizmo', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

export const StreamingHighlight = styled.span`
  color: #BFFF00;
`;

export const StreamingRegular = styled.span`
  color: white;
`;