import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <html lang="es">
      <Head>
        <title>doc</title>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#8936FF" /> {/* El color de la barra de estado */}
        <meta name="description" content="Tu descripción de la app aquí" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </html>
  );
}
