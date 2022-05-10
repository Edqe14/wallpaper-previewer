import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Script from 'next/script';
import Head from '@/components/Head';
import { setTheme } from '@/lib/store';
import Links from '@/components/Links';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setTheme(document.querySelector('html')?.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  return (
    <>
      <Head />

      <Links />

      <Script src="/js/theme.js" strategy="beforeInteractive" />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
