import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { theme } from '../styles/theme';
import '../styles/fonts.css';
import '../styles/brandName.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Importar initEasterEggs dinámicamente para asegurar que solo se ejecuta en el cliente
const EasterEggManager = dynamic(
  () => import('@/components/EasterEggManager').then((mod) => mod.default),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Solo ejecutamos esto en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
        {isMounted && <EasterEggManager />}
      </ThemeProvider>
    </Provider>
  );
}