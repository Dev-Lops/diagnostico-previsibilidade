import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Neon Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-purple-900 via-pink-900 to-red-900 animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,128,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,215,0,0.3),transparent_50%)] animate-float"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,255,255,0.2),transparent_50%)] animate-float delay-500"></div>
      </div>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge Estratégico Sofisticado */}
          <div className="inline-flex items-center gap-2 bg-gray-900/90 backdrop-blur-xl border border-cyan-500/30 text-cyan-300 rounded-full px-6 py-2.5 mb-12">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold tracking-wide">
              Diagnóstico Estratégico de Previsibilidade
            </span>
          </div>

          {/* Headline Estratégico Profissional */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              Transforme seu negócio em uma{" "}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  máquina previsível
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-cyan-500 to-purple-500 rounded-full"></div>
              </span>
              {" "}de receita
            </h1>
          </div>

          {/* Subheadline Estratégico */}
          <div className="max-w-3xl mb-10">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6">
              A diferença entre empresas que <span className="text-white font-semibold">crescem de forma consistente</span> e as que vivem no caos financeiro está na previsibilidade.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Nosso diagnóstico estratégico revela exatamente onde seu funil está vazando receita e quanto você pode recuperar com as otimizações certas.
            </p>
          </div>

          {/* CTA Estratégico Profissional */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
            <Link
              href="/diagnostico"
              className="group relative inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
            >
              Iniciar diagnóstico estratégico
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
            <div className="text-gray-400 text-sm">
              <div className="font-medium text-white mb-1">Análise completa em 3 minutos</div>
              <div>Sem cadastro • Resultado imediato</div>
            </div>
          </div>

          {/* Social Proof Sofisticado */}
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-cyan-600 border-2 border-gray-900"></div>
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-gray-900"></div>
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600 border-2 border-gray-900"></div>
              <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs font-semibold text-gray-300">+500</div>
            </div>
            <span>Utilizado por <span className="text-white font-medium">empresas de 6 e 7 dígitos</span></span>
          </div>
        </div>

        {/* Framework Estratégico */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">O que você recebe no diagnóstico</h2>
            <p className="text-gray-400 text-lg">Análise profunda baseada em métricas reais do seu negócio</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-8 transition-all duration-300">
              <div className="w-14 h-14 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-7 h-7 text-white"
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
                Análise de vazamento de receita
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Identificamos exatamente onde seu funil está perdendo dinheiro e quanto isso representa em receita não capturada
              </p>
            </div>

            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-purple-500/50 rounded-2xl p-8 transition-all duration-300">
              <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-7 h-7 text-white"
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
                Projeção de crescimento previsível
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Calculamos seu potencial real de faturamento com as otimizações estratégicas baseadas em benchmarks do mercado
              </p>
            </div>

            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-7 h-7 text-white"
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
                Roadmap de implementação
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Plano de ação priorizado com os passos exatos para transformar seu negócio em uma máquina previsível
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final Estratégico */}
        <div className="mt-32 max-w-4xl mx-auto">
          <div className="relative bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-12 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-cyan-500/10 to-purple-500/10 blur-3xl"></div>
            <div className="relative">
              <div className="mb-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Pronto para ter previsibilidade real?
                </h2>
                <p className="text-xl text-gray-300">
                  Comece pelo diagnóstico estratégico. Sem compromisso, sem complicação.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link
                  href="/diagnostico"
                  className="inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  Fazer diagnóstico agora
                  <svg
                    className="w-5 h-5"
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

                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Leva 3 minutos • Resultado imediato</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
