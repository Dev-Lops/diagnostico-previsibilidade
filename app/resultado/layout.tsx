import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resultado do Diagnóstico - Sua Análise de Previsibilidade",
  description: "Veja os resultados do seu diagnóstico de previsibilidade com métricas detalhadas e recomendações.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Resultado do Diagnóstico",
    description: "Seus resultados de previsibilidade e recomendações",
    type: "website",
  },
};

export default function ResultadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
