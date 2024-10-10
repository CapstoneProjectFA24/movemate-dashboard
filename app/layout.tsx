import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const font = Open_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Movemate",
  description: "Movemate dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
