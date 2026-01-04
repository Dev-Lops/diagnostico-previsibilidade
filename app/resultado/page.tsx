'use client'

import type { DiagnosticResponse, FormData, PredictabilityLevel } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ResultadoPage() {
  const router = useRouter()
  const [result] = useState<DiagnosticResponse | null>(() => {
    if (typeof window === 'undefined') return null
    const savedResult = localStorage.getItem('diagnosticResult')
    const savedForm = localStorage.getItem('diagnosticForm')

    if (!savedResult || !savedForm) {
      return null
    }

    return JSON.parse(savedResult)
  })
  const [formData] = useState<FormData | null>(() => {
    if (typeof window === 'undefined') return null
    const savedForm = localStorage.getItem('diagnosticForm')
    return savedForm ? JSON.parse(savedForm) : null
  })

  useEffect(() => {
    const savedResult = localStorage.getItem('diagnosticResult')
    const savedForm = localStorage.getItem('diagnosticForm')

    if (!savedResult || !savedForm) {
      router.push('/diagnostico')
    }
  }, [router])

  if (!result || !formData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-pink-900/20 to-red-900/20 animate-gradient-shift"></div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">Analisando seus dados...</p>
        </div>
      </div>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getPredictabilityColor = (level: PredictabilityLevel) => {
    switch (level) {
      case 'Alta':
        return 'text-green-700 bg-linear-to-br from-green-100 to-emerald-100 border-green-300'
      case 'Média':
        return 'text-yellow-700 bg-linear-to-br from-yellow-100 to-orange-100 border-yellow-300'
      case 'Baixa':
        return 'text-red-700 bg-linear-to-br from-red-100 to-rose-100 border-red-300'
    }
  }

  const getPredictabilityIcon = (level: PredictabilityLevel) => {
    switch (level) {
      case 'Alta':
        return '🎯'
      case 'Média':
        return '⚠️'
      case 'Baixa':
        return '🚨'
    }
  }

  // Fallback para resultados antigos no localStorage que não tinham timeline
  const currentRevenue = result.potentialRevenue - result.monthlyLoss
  const timeline = result.timeline ?? {
    month1: Math.round(currentRevenue * 1.05),
    month3: Math.round(currentRevenue * 1.15),
    month6: Math.round(currentRevenue * 1.25),
    month12: Math.round(result.potentialRevenue),
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Neon Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-purple-900 via-pink-900 to-red-900 animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,128,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,215,0,0.3),transparent_50%)] animate-float"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,255,255,0.2),transparent_50%)] animate-float delay-500"></div>
      </div>

      <main className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-900/90 backdrop-blur-xl border border-cyan-500/30 text-cyan-300 rounded-full px-6 py-2.5 mb-8">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold tracking-wide">
              Análise Concluída
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            {formData.name.split(' ')[0]}, sua{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                oportunidade de crescimento
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-cyan-500 to-purple-500 rounded-full"></div>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
            Análise profunda baseada nos dados reais do seu negócio. Abaixo, as métricas exatas para transformar sua empresa em um motor previsível de receita.
          </p>
        </div>

        {/* Main Metric - Loss */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-12 md:p-16 overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-red-500/20 to-orange-500/20 blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-red-900/30 border border-red-500/30 text-red-300 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Oportunidade Imediata</span>
              </div>
              <p className="text-gray-400 text-lg mb-4">Receita não capturada por mês</p>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-6xl md:text-7xl font-bold text-white">
                  {formatCurrency(result.monthlyLoss)}
                </span>
                <span className="text-gray-400 text-lg">
                  ≈ {formatCurrency(Math.round(result.monthlyLoss / 30))}/dia
                </span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                Esta é a diferença entre seu faturamento atual e o que você poderia gerar com um sistema previsível implementado.
              </p>
            </div>
          </div>
        </div>

        {/* Three Key Metrics */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Metric 1 */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-8 transition-all duration-300">
              <div className="w-14 h-14 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Potencial Realista
              </h3>
              <p className="text-4xl font-bold text-white mb-3">
                {formatCurrency(result.potentialRevenue)}
              </p>
              <p className="text-gray-400 leading-relaxed">
                Com sistema previsível implementado
              </p>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-cyan-400 font-bold text-lg">
                  +{Math.round((result.potentialRevenue / (result.potentialRevenue - result.monthlyLoss) - 1) * 100)}%
                </p>
                <p className="text-gray-500 text-sm">crescimento possível</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-purple-500/50 rounded-2xl p-8 transition-all duration-300">
              <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Investimento Necessário
              </h3>
              <p className="text-4xl font-bold text-white mb-3">
                {formatCurrency(result.recommendedInvestment)}
              </p>
              <p className="text-gray-400 leading-relaxed">
                Para atingir todo o potencial
              </p>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-purple-400 font-bold text-lg">
                  {Math.round((result.monthlyLoss / result.recommendedInvestment) * 100)}%
                </p>
                <p className="text-gray-500 text-sm">ROI mensal estimado</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Leads Necessários
              </h3>
              <p className="text-4xl font-bold text-white mb-3">
                {result.estimatedLeads}
              </p>
              <p className="text-gray-400 leading-relaxed">
                Por mês para atingir a meta
              </p>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-blue-400 font-bold text-lg">
                  {result.currentSales} → {result.estimatedSales}
                </p>
                <p className="text-gray-500 text-sm">meta de fechamentos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Metrics - LTV, Payback, ROI */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-white mb-8">Métricas Avançadas</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* LTV */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
              <p className="text-amber-400 text-sm font-bold uppercase mb-3">Lifetime Value (LTV)</p>
              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-1">Atual</p>
                <p className="text-4xl font-bold text-white mb-3">{formatCurrency(result.currentLTV)}</p>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-xs mb-1">Projetado</p>
                <p className="text-3xl font-bold text-amber-400">{formatCurrency(result.projectedLTV)}</p>
                <p className="text-green-400 text-sm mt-2">
                  +{Math.round(((result.projectedLTV - result.currentLTV) / result.currentLTV) * 100)}% de melhoria
                </p>
              </div>
            </div>

            {/* Payback Period */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
              <p className="text-green-400 text-sm font-bold uppercase mb-3">Payback Period</p>
              <p className="text-6xl font-bold text-white mb-3">{result.paybackPeriod}</p>
              <p className="text-gray-400 mb-4">meses para recuperar investimento</p>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-300">
                  {result.paybackPeriod <= 3 ? '🚀 Excelente' : result.paybackPeriod <= 6 ? '✅ Bom' : '⚠️ Atenção'}:
                  {result.paybackPeriod <= 3 ? ' retorno rápido' : result.paybackPeriod <= 6 ? ' retorno saudável' : ' retorno lento'}
                </p>
              </div>
            </div>

            {/* ROI */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
              <p className="text-blue-400 text-sm font-bold uppercase mb-3">ROI Mensal</p>
              <p className="text-6xl font-bold text-white mb-3">{result.roi}%</p>
              <p className="text-gray-400 mb-4">retorno sobre investimento</p>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-300">
                  A cada R$ 1,00 investido, você recupera R$ {(result.roi / 100 + 1).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After Comparison with Progress Bars */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-white mb-8">Comparativo: Situação Atual vs. Potencial</h3>
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 space-y-8">
            {/* Revenue Comparison */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-white font-semibold">Receita Mensal</span>
                <span className="text-cyan-400 text-sm">+{Math.round(((result.potentialRevenue - (result.potentialRevenue - result.monthlyLoss)) / (result.potentialRevenue - result.monthlyLoss)) * 100)}%</span>
              </div>
              <div className="relative h-12 bg-gray-800 rounded-xl overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-linear-to-r from-red-500 to-red-600 flex items-center px-4 transition-all duration-1000 w-[70%]">
                  <span className="text-white text-sm font-bold">{formatCurrency(result.potentialRevenue - result.monthlyLoss)}</span>
                </div>
                <div className="absolute top-0 left-0 h-full bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-end px-4 transition-all duration-1000 delay-300 w-full">
                  <span className="text-white text-sm font-bold">{formatCurrency(result.potentialRevenue)}</span>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Atual</span>
                <span>Potencial</span>
              </div>
            </div>

            {/* Leads Comparison */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-white font-semibold">Leads Mensais</span>
                <span className="text-purple-400 text-sm">+{Math.round(((result.estimatedLeads - result.currentLeads) / result.currentLeads) * 100)}%</span>
              </div>
              <div className="relative h-12 bg-gray-800 rounded-xl overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-linear-to-r from-red-500 to-red-600 flex items-center px-4"
                  style={{ width: `${(result.currentLeads / result.estimatedLeads) * 100}%` }}
                >
                  <span className="text-white text-sm font-bold">{result.currentLeads}</span>
                </div>
                <div
                  className="absolute top-0 left-0 h-full bg-linear-to-r from-purple-500 to-pink-600 flex items-center justify-end px-4 opacity-50"
                  style={{ width: '100%' }}
                >
                  <span className="text-white text-sm font-bold">{result.estimatedLeads}</span>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Atual: {result.currentLeads} leads</span>
                <span>Meta: {result.estimatedLeads} leads</span>
              </div>
            </div>

            {/* Sales Comparison */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-white font-semibold">Vendas Mensais</span>
                <span className="text-green-400 text-sm">+{Math.round(((result.estimatedSales - result.currentSales) / result.currentSales) * 100)}%</span>
              </div>
              <div className="relative h-12 bg-gray-800 rounded-xl overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-linear-to-r from-red-500 to-red-600 flex items-center px-4"
                  style={{ width: `${(result.currentSales / result.estimatedSales) * 100}%` }}
                >
                  <span className="text-white text-sm font-bold">{result.currentSales}</span>
                </div>
                <div
                  className="absolute top-0 left-0 h-full bg-linear-to-r from-green-500 to-emerald-600 flex items-center justify-end px-4 opacity-50"
                  style={{ width: '100%' }}
                >
                  <span className="text-white text-sm font-bold">{result.estimatedSales}</span>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Atual: {result.currentSales} vendas</span>
                <span>Meta: {result.estimatedSales} vendas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-white mb-8">Projeção de Crescimento (12 meses)</h3>
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="relative">
                <div className="bg-linear-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
                  <p className="text-cyan-400 text-sm font-bold mb-2">MÊS 1</p>
                  <p className="text-3xl font-bold text-white mb-1">{formatCurrency(timeline.month1)}</p>
                  <p className="text-xs text-gray-400">+5% vs. atual</p>
                </div>
                {/* Connection Line */}
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-linear-to-r from-cyan-500/50 to-transparent"></div>
              </div>

              <div className="relative">
                <div className="bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
                  <p className="text-purple-400 text-sm font-bold mb-2">MÊS 3</p>
                  <p className="text-3xl font-bold text-white mb-1">{formatCurrency(timeline.month3)}</p>
                  <p className="text-xs text-gray-400">+15% vs. atual</p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-linear-to-r from-purple-500/50 to-transparent"></div>
              </div>

              <div className="relative">
                <div className="bg-linear-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-xl p-6">
                  <p className="text-blue-400 text-sm font-bold mb-2">MÊS 6</p>
                  <p className="text-3xl font-bold text-white mb-1">{formatCurrency(timeline.month6)}</p>
                  <p className="text-xs text-gray-400">+25% vs. atual</p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-linear-to-r from-blue-500/50 to-transparent"></div>
              </div>

              <div>
                <div className="bg-linear-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
                  <p className="text-green-400 text-sm font-bold mb-2">MÊS 12</p>
                  <p className="text-3xl font-bold text-white mb-1">{formatCurrency(timeline.month12)}</p>
                  <p className="text-xs text-gray-400">Meta completa</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-gray-300 text-center">
                💡 <span className="font-semibold text-white">Projeção conservadora</span> baseada em implementação gradual do sistema de previsibilidade
              </p>
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-white mb-8">Seu Plano de Ação Personalizado</h3>
          <div className="bg-linear-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Recomendações baseadas no seu nível: {result.predictability}</h4>
                <p className="text-gray-300">Siga estas ações na ordem para maximizar resultados</p>
              </div>
            </div>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-4 bg-gray-900/50 rounded-xl p-5 border border-gray-700/50">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 font-bold text-white text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-200 leading-relaxed flex-1">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Predictability Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-10">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-6xl">{getPredictabilityIcon(result.predictability)}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Nível de Previsibilidade Atual
                </h3>
                <div className="inline-flex items-center gap-3">
                  <span className={`px-5 py-2 rounded-xl font-bold text-lg border-2 ${getPredictabilityColor(result.predictability)}`}>
                    {result.predictability}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                {result.predictability === 'Alta' && (
                  <>
                    Você tem uma base sólida para crescer de forma previsível. Com as otimizações certas, pode escalar o negócio com segurança e sustentabilidade.
                  </>
                )}
                {result.predictability === 'Média' && (
                  <>
                    Há bom potencial, mas existem oportunidades importantes para melhorar a previsibilidade e reduzir a dependência de indicações aleatórias.
                  </>
                )}
                {result.predictability === 'Baixa' && (
                  <>
                    Seu negócio precisa urgentemente de mais previsibilidade para evitar perdas e crescer de forma sustentável. Priorize a criação de um sistema estruturado.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Current Metrics Dashboard */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-white mb-8">Sua Situação Atual</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
              <p className="text-cyan-400 text-sm font-bold uppercase mb-3">Vendas por mês</p>
              <p className="text-6xl font-black text-white mb-2">{result.currentSales}</p>
              <p className="text-gray-400">vendas/mês atuais</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
              <p className="text-purple-400 text-sm font-bold uppercase mb-3">Leads por mês</p>
              <p className="text-6xl font-black text-white mb-2">{result.currentLeads}</p>
              <p className="text-gray-400">leads/mês atuais</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
              <p className="text-pink-400 text-sm font-bold uppercase mb-3">Custo de Aquisição</p>
              <p className="text-5xl font-black text-white mb-2">{formatCurrency(result.currentCAC)}</p>
              <p className="text-gray-400">por cliente adquirido</p>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {result.warnings.length > 0 && (
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-4xl">⚠️</span> Pontos Críticos de Atenção
              </h3>
              <div className="space-y-4">
                {result.warnings.map((warning, index) => (
                  <div key={index} className="bg-red-900/20 border border-red-500/30 rounded-xl p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center shrink-0 font-bold text-red-300">
                      {index + 1}
                    </div>
                    <p className="text-red-200 font-semibold text-base">{warning}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Why Us Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-white mb-6">Por que fechar a gestão de tráfego pago comigo</h3>
          <p className="text-gray-300 mb-8 max-w-4xl">
            Você tem {formatCurrency(result.monthlyLoss)} não capturados todo mês. Meu trabalho é transformar esse valor em receita previsível, com responsabilidade e transparência.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">1</div>
                <h4 className="text-xl font-bold text-white">Plano de 90 dias com metas claras</h4>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Meta financeira: recuperar {formatCurrency(result.monthlyLoss)} e atingir {formatCurrency(result.potentialRevenue)}.</li>
                <li>Metas operacionais: leads/mês de {result.currentLeads} → {result.estimatedLeads}, vendas de {result.currentSales} → {result.estimatedSales}.</li>
                <li>Payback estimado: {result.paybackPeriod} meses com ROI projetado de {result.roi}%.</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">2</div>
                <h4 className="text-xl font-bold text-white">Execução ponta a ponta</h4>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Pesquisa, estratégia e segmentação para reduzir CPL (hoje: {formatCurrency(result.costPerLead)}).</li>
                <li>Criação e testes de criativos, landing pages e ofertas (CRO) para elevar conversão.</li>
                <li>Orquestração com CRM/funil para que cada lead gere vendas reais, não só cliques.</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">3</div>
                <h4 className="text-xl font-bold text-white">Transparência e governança</h4>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Dashboards semanais: investimentos, CPL, CAC, ROI e LTV.</li>
                <li>Reunião quinzenal com plano de ação e próximos testes.</li>
                <li>Orçamento controlado com teto e alertas para evitar desperdício.</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 border border-amber-500/20 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">4</div>
                <h4 className="text-xl font-bold text-white">Risco controlado e velocidade</h4>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Começamos com sprints de teste: validar criativos e ofertas em 14 dias.</li>
                <li>Escalamos apenas o que prova resultado; pausamos o que não performa.</li>
                <li>Foco em lucro, não só cliques: payback, CAC e LTV guiando decisões.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-12 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-cyan-500/10 to-purple-500/10 blur-3xl"></div>
            <div className="relative">
              <div className="mb-8 text-center">
                <div className="text-6xl mb-6">🚀</div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Pronto para recuperar {formatCurrency(result.monthlyLoss)}?
                </h2>
                <p className="text-xl text-gray-300">
                  Agende uma conversa estratégica gratuita de 30 minutos e descubra o caminho mais rápido para criar previsibilidade real.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="https://reuni-on.vercel.app/book/social-media"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  Agendar conversa gratuita
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>

                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% gratuito • Sem compromisso</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center text-gray-500 text-sm py-8">
          <p>* Este diagnóstico é uma estimativa baseada nos dados informados. Resultados reais podem variar.</p>
        </div>
      </main>
    </div>
  )
}
