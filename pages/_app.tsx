import { ChakraProvider } from '@chakra-ui/react';
import { AppContextProvider } from '../context/appContext';
import { SessionProvider } from 'next-auth/react';
import Layout from '../layouts/layout';
import { theme } from '../styles/theme';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'easymde/dist/easymde.min.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </AppContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
