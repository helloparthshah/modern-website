import { Html, Head, Main, NextScript } from 'next/document'
import { bootScript } from '@/components/prefs'
import { DESIGNS } from '@/components/design'

const FONTS = Object.fromEntries(Object.entries(DESIGNS).filter(([, d]) => d.fonts).map(([k, d]) => [k, d.fonts]));

/**
 * @component
 * @description The document component which is used to render the HTML document. It is used to inject the CSS and JS files.
 * @returns {JSX.Element} The JSX element to be rendered.
*/
export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: bootScript(FONTS) }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}