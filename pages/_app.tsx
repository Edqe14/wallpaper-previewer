import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { useObservable } from '@ngneat/use-observable';
import Head from '@/components/Head';
import { theme$ } from '@/lib/store';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme] = useObservable(theme$);

  return (
    <>
      <Head />

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionOptions={{ key: 'mantine', prepend: false }}
        theme={{
          /** Put your mantine theme override here */
          colorScheme: theme,
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default MyApp;
