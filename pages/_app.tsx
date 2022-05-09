import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useObservable } from '@ngneat/use-observable';
import { useEffect } from 'react';
import Head from '@/components/Head';
import { setTheme, theme$ } from '@/lib/store';
import Links from '@/components/Links';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme] = useObservable(theme$);

  useEffect(() => {
    setTheme(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <Head />

      <Links />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
