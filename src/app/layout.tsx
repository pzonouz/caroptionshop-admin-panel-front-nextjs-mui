import "./globals.css";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CacheRtl } from "@/components/Utils/CacheRtl";
import { ThemeProviderWrapper } from "@/components/Utils/ThemeProviderWrapper";
import { Vazirmatn } from "next/font/google";
import Appbar from "@/components/Navigation/AppBar";

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
              <Appbar>{children}</Appbar>
            </CacheRtl>
          </ThemeProviderWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
