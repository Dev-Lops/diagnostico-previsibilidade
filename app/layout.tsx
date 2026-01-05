import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diagnóstico de Previsibilidade | Transforme seu Negócio em Receita Previsível",
  description: "Diagnóstico estratégico que revela quanto seu negócio está perdendo por falta de previsibilidade. Análise completa em 3 minutos, sem cadastro. Descubra seu potencial de crescimento.",
  keywords: ["diagnóstico empresarial", "previsibilidade", "receita", "faturamento", "crescimento empresarial", "diagnóstico negócio"],
  authors: [{ name: "Dev-Lops" }],
  creator: "Dev-Lops",
  publisher: "Dev-Lops",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://diagnostico-previsibilidade.vercel.app",
    title: "Diagnóstico de Previsibilidade | Transforme seu Negócio",
    description: "Descubra quanto seu negócio está perdendo e como recuperar receita com previsibilidade. Análise em 3 minutos.",
    images: [
      {
        url: "https://diagnostico-previsibilidade.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diagnóstico de Previsibilidade",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnóstico de Previsibilidade",
    description: "Descubra quanto seu negócio está perdendo e como recuperar receita",
    creator: "@DevLops",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  colorScheme: "dark light",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
