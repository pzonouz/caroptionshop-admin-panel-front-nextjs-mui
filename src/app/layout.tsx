import "./globals.css";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Vazirmatn } from "next/font/google";
import { ThemeProviderWrapper } from "./components/Utils/ThemeProviderWrapper";
import { CacheRtl } from "./components/Utils/CacheRtl";
import Appbar from "./components/Navigation/AppBar";
import { ReduxProviderWrapper } from "@/redux-toolkit/ReduxProviderWrapper";

const vazirmatn = Vazirmatn({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={vazirmatn.variable}>
        <AppRouterCacheProvider>
          <ThemeProviderWrapper>
            <CacheRtl>
              <CssBaseline enableColorScheme />
              <ReduxProviderWrapper>
                <Appbar>{children}</Appbar>
              </ReduxProviderWrapper>
            </CacheRtl>
          </ThemeProviderWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
