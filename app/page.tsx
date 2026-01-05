import { SchemaOrgHome, SchemaOrgOrganization } from "@/lib/schema-org";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diagnóstico de Previsibilidade | Transforme seu Negócio em Receita Previsível",
  description: "Diagnóstico estratégico que revela quanto seu negócio está perdendo por falta de previsibilidade. Análise completa em 3 minutos, sem cadastro.",
  alternates: {
    canonical: "https://diagnostico-previsibilidade.vercel.app",
  },
  openGraph: {
    url: "https://diagnostico-previsibilidade.vercel.app",
    type: "website",
    title: "Diagnóstico de Previsibilidade | Transforme seu Negócio em Receita Previsível",
    description: "Análise estratégica que mostra quanto você está perdendo e como recuperar receita. Resultado em 3 minutos.",
  },
};

export default function Home() {
  return (
    <>
      <SchemaOrgHome />
      <SchemaOrgOrganization />
      <div className="min-h-screen bg-premium-dark relative overflow-hidden">
        {/* Premium Animated Background */}
        <div className="absolute inset-0 opacity-50">
          {/* Gold gradient orbs - Responsivos */}
          <div className="absolute top-0 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-gradient-to-br from-amber-600/20 via-amber-700/10 to-transparent blur-3xl animate-float"></div>
          <div className="absolute top-1/2 right-0 w-24 h-24 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-gradient-to-bl from-amber-600/15 via-transparent to-transparent blur-3xl animate-float delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-gradient-to-tr from-amber-700/10 to-transparent blur-3xl animate-float delay-500"></div>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(0deg,transparent_24%,rgba(212,175,55,.05)_25%,rgba(212,175,55,.05)_26%,transparent_27%,transparent_74%,rgba(212,175,55,.05)_75%,rgba(212,175,55,.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(212,175,55,.05)_25%,rgba(212,175,55,.05)_26%,transparent_27%,transparent_74%,rgba(212,175,55,.05)_75%,rgba(212,175,55,.05)_76%,transparent_77%,transparent)] bg-[50px_50px]"></div>
        </div>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-12 sm:py-16 md:py-24 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 glass-premium px-4 sm:px-6 py-2 sm:py-3 mb-8 sm:mb-12 rounded-full animate-fade-in-up delay-100">
              <div className="w-2.5 h-2.5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                DIAGNÓSTICO ESTRATÉGICO PREMIUM
              </span>
            </div>

            {/* Main Headline - Premium Gold Gradient */}
            <div className="mb-8 sm:mb-12 animate-fade-in-up delay-200">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
                Transforme seu negócio em{" "}
                <span className="gold-text">
                  receita previsível
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <div className="max-w-3xl mb-8 sm:mb-12 animate-fade-in-up delay-300">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed mb-4 sm:mb-6">
                A diferença entre empresas que <span className="gold-text-subtle">crescem exponencialmente</span> e as que vivem no caos financeiro está na previsibilidade de receita.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                Nosso diagnóstico estratégico revela exatamente onde seu funil está vazando receita e quanto você pode recuperar com otimizações precisas.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12 animate-fade-in-up delay-400">
              <Link
                href="/diagnostico"
                className="btn-premium rounded-full px-6 sm:px-12 py-3 sm:py-5 text-sm sm:text-lg font-bold shadow-gold-glow hover:shadow-gold-lg w-full sm:w-auto text-center"
              >
                Iniciar Diagnóstico Premium
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <div className="text-gray-300 text-sm">
                <div className="font-semibold text-white mb-1">⚡ 3 minutos de análise</div>
                <div className="text-gray-400">Sem cadastro obrigatório • Resultado imediato</div>
              </div>
            </div>

            {/* Social Proof - Premium with AI Avatars */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-300 text-sm animate-fade-in-up delay-500">
              <div className="flex -space-x-4">
                <img
                  src="https://robohash.org/user1?size=44x44&bgset=bg1"
                  alt="Avatar 1"
                  className="avatar-ai"
                />
                <img
                  src="https://robohash.org/user2?size=44x44&bgset=bg2"
                  alt="Avatar 2"
                  className="avatar-ai"
                />
                <img
                  src="https://robohash.org/user3?size=44x44&bgset=bg3"
                  alt="Avatar 3"
                  className="avatar-ai"
                />
                <div className="w-11 h-11 rounded-full bg-black border-2 border-amber-600/50 flex items-center justify-center text-xs font-bold text-amber-400 shadow-lg flex-shrink-0">+500</div>
              </div>
              <span className="gold-text-subtle">Utilizado por empresas de 6 e 7 dígitos</span>
            </div>
          </div>

          {/* Features Grid - Premium Black & Gold */}
          <div className="mt-16 sm:mt-24 md:mt-32 max-w-6xl mx-auto px-0">
            <div className="mb-12 sm:mb-16 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                O que você <span className="gold-text">descobre</span> no diagnóstico
              </h2>
              <div className="divider-gold-thick max-w-20 mx-auto mt-6"></div>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-6 sm:mt-8">Análise profunda baseada em métricas reais do seu negócio</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Card 1 */}
              <div className="card-premium rounded-2xl p-6 sm:p-8 group hover-lift">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-gold">
                  <svg
                    className="w-6 sm:w-7 h-6 sm:h-7 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Análise de Vazamento
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Identificamos exatamente onde seu funil perde receita e quanto isso representa em vendas não capturadas
                </p>
                <div className="mt-4 text-amber-400 text-sm font-semibold">→ Descobrir vazamentos</div>
              </div>

              {/* Card 2 */}
              <div className="card-premium rounded-2xl p-8 group hover-lift">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-xl flex items-center justify-center mb-6 shadow-gold">
                  <svg
                    className="w-7 h-7 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Projeção de Crescimento
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Calculamos seu potencial real de faturamento com otimizações estratégicas baseadas em benchmarks
                </p>
                <div className="mt-4 text-amber-400 text-sm font-semibold">→ Ver projeções</div>
              </div>

              {/* Card 3 */}
              <div className="card-premium rounded-2xl p-8 group hover-lift">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center mb-6 shadow-gold">
                  <svg
                    className="w-7 h-7 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Roadmap Personalizado
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Plano de ação priorizado com os passos exatos para transformar seu negócio em máquina previsível
                </p>
                <div className="mt-4 text-amber-400 text-sm font-semibold">→ Acessar roadmap</div>
              </div>
            </div>
          </div>

          {/* Final CTA - Premium */}
          <div className="mt-32 max-w-4xl mx-auto">
            <div className="relative card-premium-dark rounded-3xl p-12 md:p-16 overflow-hidden">
              {/* Premium gold accent */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-yellow-500/20 via-amber-600/10 to-transparent blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-amber-600/10 to-transparent blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Pronto para transformar seu negócio?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Comece com um diagnóstico estratégico completo. <span className="gold-text-subtle">Sem compromisso, sem complicação.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <Link
                    href="/diagnostico"
                    className="btn-premium rounded-full px-14 py-6 text-lg font-bold shadow-gold-lg hover:shadow-gold-glow"
                  >
                    Fazer Diagnóstico Agora
                  </Link>

                  <div className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">3 minutos • Resultado instantâneo</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="divider-gold my-8"></div>

                {/* Trust signals */}
                <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-bold">✓</span>
                    <span>100% confidencial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-bold">✓</span>
                    <span>Sem spam de email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-bold">✓</span>
                    <span>Análise profissional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
