import { ChakraProvider } from '@chakra-ui/react';
import type { AppType } from 'next/app';
import { AppContextProvider } from '../context/appContext';
import { SessionProvider } from 'next-auth/react';
import Layout from '../layouts/layout';
import { type Session } from 'next-auth';
import { theme } from '../styles/theme';
import { trpc } from '../utils/trpc';
import NextNProgress from 'nextjs-progressbar';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <ChakraProvider theme={theme}>
          <NextNProgress color="#814226" />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </AppContextProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
