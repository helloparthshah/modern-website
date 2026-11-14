import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/globals.css'
import '@/styles/designs.css'
import "@/styles/flipBoard.scss";
import Layout from '@/components/layout';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

const config = process.env.CONFIG;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{config.name}</title>
        <meta name="description" content={config.description} />
        {/* Link previews (LinkedIn, Slack, X, iMessage) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={config.name} />
        <meta property="og:title" content={config.name} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:image" content={`${config.siteUrl}${config.ogImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta property="og:image:alt" content={`${config.name}'s portfolio`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.name} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:image" content={`${config.siteUrl}${config.ogImage}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/images/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;600&display=swap" rel="stylesheet"/>
      </Head>
      <Layout initialDesign={pageProps.initialDesign}>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  )
}
