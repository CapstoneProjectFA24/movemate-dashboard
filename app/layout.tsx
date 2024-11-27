import type { Metadata, Viewport } from "next";
import "./globals.css";
// import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { siteConfig } from "@/config/site";
// const font = Open_Sans({ subsets: ["latin"] });
import { fontMono, fontSans } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

import SessionProviders from "@/providers/session-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { QueryProvider } from "@/providers/query-provider";

import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["nextjs", "movemate"],
  authors: [
    {
      name: "vinhnt2002",
      url: "https://portfolio-vinhnt2002.vercel.app",
    },
  ],
  creator: "vinhnt2002",
  icons: {
    icon: "/images/icons_favicon/icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
       <NextTopLoader height={5} color="#E87931"/>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProviders>
            <QueryProvider>
              <ModalProvider />
              {children}
              <Toaster />
            </QueryProvider>
          </SessionProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
