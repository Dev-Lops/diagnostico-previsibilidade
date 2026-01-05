import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnóstico - Análise Estratégica de Previsibilidade",
  description: "Responda algumas perguntas sobre seu negócio e receba um diagnóstico completo sobre sua previsibilidade de receita.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Diagnóstico - Análise Estratégica de Previsibilidade",
    description: "Diagnóstico em 3 passos simples",
    type: "website",
  },
};

export default function DiagnosticoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
