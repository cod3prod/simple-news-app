import type { Metadata } from "next";
import "@/styles/index.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Simple News App",
  description: "Simple News App with API",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
