import React from 'react';
import HomePage from './home/home';

/**
 * Index page that renders the HomePage component
 * The layout (Header and Footer) is handled by RootLayout in _app.tsx
 */
const IndexPage: React.FC = () => {
  return <HomePage />;
};

export default IndexPage;
