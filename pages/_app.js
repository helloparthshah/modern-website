import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import Layout from '@/components/layout';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Parth Shah</title>
        <meta name="description" content="Parth Shah's personal website." />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
