import { type PropsWithChildren } from "react";
import { ScrollViewStyleReset } from "expo-router/html";

/**
 * Web root document — ensures full-height flex chain and dark canvas behind RN web.
 * @see https://necolas.github.io/react-native-web/docs/setup/#root-element
 */
export default function HtmlRoot({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <ScrollViewStyleReset />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body { background-color: #09090b !important; }
              #root { background-color: #09090b !important; }
            `,
          }}
        />
      </head>
      <body style={{ backgroundColor: "#09090b" }}>{children}</body>
    </html>
  );
}
