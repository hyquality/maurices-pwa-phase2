import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="description"
            content="At maurices, we offer a wide selection of women's clothing from sizes 0-24, including jeans, tops, dresses and more. Enjoy free shipping on orders over $50!"
          />
          <meta
            name="keywords"
            content="Women's Fashion | Denim, Accessories, Plus Size & More | maurices"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/icons/favicon.ico"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <meta name="theme-color" content="#5ab7b2" />
        </Head>
        <body className="stickyNavigation">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
