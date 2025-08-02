import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "StoreGroup",
  description: "매장 그룹화해드려요",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "StoreGroup",
  },
  icons: {
    icon: [
      { url: "/web/favicon.ico" },
      { url: "/web/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/web/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/web/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="application-name" content="StoreGroup" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="StoreGroup" />
        <meta name="description" content="매장 그룹화해드려요" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="google-site-verification"
          content="FSXKlC8L2fC87G2HeDdxtnQyzDlOM4C3Y1eYoq3mzVA"
        />

        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />

        <link rel="apple-touch-icon" href="/web/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/web/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/web/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/web/favicon.ico"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/web/apple-touch-icon.png"
          color="#000000"
        />
        <link rel="shortcut icon" href="/web/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 overflow-hidden`}
      >
        <div className="max-w-[420px] mx-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
