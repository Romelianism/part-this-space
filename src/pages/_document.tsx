import Document, { Head, Html, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";
import { author, description, Icon_ico, Icon_svg } from "../config";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="author" content={author} />
          <meta name="description" content={description} />
          <link rel="icon" href={Icon_ico} sizes="any" />
          <link rel="icon" href={Icon_svg} type="image/svg+xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
