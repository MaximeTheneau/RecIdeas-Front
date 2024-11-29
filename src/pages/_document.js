import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import { randomBytes } from 'crypto';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    const { query } = ctx;
    const locale = query.locale || 'fr';

    return { ...initialProps, locale };
  }

  render() {
    const nonce = randomBytes(128).toString('base64');
    const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: 'nonce-${nonce}' 'strict-dynamic'`;
    return (
      <Html lang={this.props.locale}>
        <Head nonce={nonce}>
          <meta charSet="UTF-8" />
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
