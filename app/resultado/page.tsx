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
      <div className="min-h-screen bg-premium-dark flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-gradient-to-br from-amber-600/20 via-amber-700/10 to-transparent blur-3xl animate-float"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin mb-4"></div>
          <p className="text-gray-300 font-medium text-sm sm:text-base">Analisando seus dados...</p>
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
        return 'text-amber-300 bg-gradient-to-br from-amber-950/50 to-yellow-950/50 border-amber-500/50'
      case 'Média':
        return 'text-yellow-300 bg-gradient-to-br from-yellow-950/50 to-orange-950/50 border-yellow-500/50'
      case 'Baixa':
        return 'text-red-300 bg-gradient-to-br from-red-950/50 to-rose-950/50 border-red-500/50'
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
    <div className="min-h-screen bg-premium-dark relative overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-gradient-to-br from-amber-600/20 via-amber-700/10 to-transparent blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-0 w-24 h-24 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-gradient-to-bl from-amber-600/15 via-transparent to-transparent blur-3xl animate-float delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-gradient-to-tr from-amber-700/10 to-transparent blur-3xl animate-float delay-500"></div>
      </div>

      <main className="container mx-auto px-4 py-8 sm:py-16 md:py-24 relative z-10">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 glass-premium px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 rounded-full">
            <div className="w-2.5 h-2.5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
              ANÁLISE CONCLUÍDA
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
            {formData.name.split(' ')[0]}, sua{" "}
            <span className="gold-text">
              oportunidade de crescimento
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed">
            Análise profunda baseada nos dados reais do seu negócio. Abaixo, as métricas exatas para transformar sua empresa em um motor previsível de receita.
          </p>
        </div>

        {/* Main Metric - Loss */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
          <div className="relative card-premium rounded-3xl p-6 sm:p-12 md:p-16 overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/15 to-orange-500/15 blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 badge-gold px-3 sm:px-4 py-2 mb-4 sm:mb-6 rounded-full text-xs sm:text-sm">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse"></div>
                <span className="font-bold">OPORTUNIDADE IMEDIATA</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-lg mb-3 sm:mb-4">Receita não capturada por mês</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-3 sm:gap-4 mb-6 sm:mb-8">
                <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  {formatCurrency(result.monthlyLoss)}
                </span>
                <span className="text-gray-400 text-sm sm:text-lg">
                  ≈ {formatCurrency(Math.round(result.monthlyLoss / 30))}/dia
                </span>
              </div>
              <p className="text-gray-300 text-sm sm:text-lg leading-relaxed max-w-2xl">
                Esta é a diferença entre seu faturamento atual e o que você poderia gerar com um sistema previsível implementado.
              </p>
            </div>
          </div>
        </div>

        {/* Three Key Metrics */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Metric 1 */}
            <div className="card-premium rounded-2xl p-6 sm:p-8 group hover-lift">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-gold">
                <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Potencial Realista
              </h3>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-3">
                {formatCurrency(result.potentialRevenue)}
              </p>
              <p className="text-gray-400 leading-relaxed">
                Com sistema previsível implementado
              </p>
              <div className="mt-6 pt-6 border-t border-amber-600/30">
                <p className="text-amber-400 font-bold text-lg">
                  +{Math.round((result.potentialRevenue / (result.potentialRevenue - result.monthlyLoss) - 1) * 100)}%
                </p>
                <p className="text-gray-500 text-sm">crescimento possível</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="card-premium rounded-2xl p-8 group hover-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center mb-6 shadow-gold">
                <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Investimento Necessário
              </h3>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-3">
                {formatCurrency(result.recommendedInvestment)}
              </p>
              <p className="text-gray-400 leading-relaxed">
                Para atingir todo o potencial
              </p>
              <div className="mt-6 pt-6 border-t border-amber-600/30">
                <p className="text-amber-400 font-bold text-lg">
                  {Math.round((result.monthlyLoss / result.recommendedInvestment) * 100)}%
                </p>
                <p className="text-gray-500 text-sm">ROI mensal estimado</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="card-premium rounded-2xl p-8 group hover-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-xl flex items-center justify-center mb-6 shadow-gold">
                <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Leads Necessários
              </h3>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-3">
                {result.estimatedLeads}
              </p>
              <p className="text-gray-400 leading-relaxed">
                Por mês para atingir a meta
              </p>
              <div className="mt-6 pt-6 border-t border-amber-600/30">
                <p className="text-amber-400 font-bold text-lg">
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
            <div className="card-premium rounded-2xl p-8">
              <p className="text-amber-400 text-sm font-bold uppercase mb-3 tracking-wide">Lifetime Value (LTV)</p>
              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-1">Atual</p>
                <p className="text-4xl font-bold text-white mb-3">{formatCurrency(result.currentLTV)}</p>
              </div>
              <div className="pt-4 border-t border-amber-600/30">
                <p className="text-gray-400 text-xs mb-1">Projetado</p>
                <p className="text-3xl font-bold text-amber-400">{formatCurrency(result.projectedLTV)}</p>
                <p className="text-amber-400 text-sm mt-2 font-semibold">
                  +{Math.round(((result.projectedLTV - result.currentLTV) / result.currentLTV) * 100)}% de melhoria
                </p>
              </div>
            </div>

            {/* Payback Period */}
            <div className="card-premium rounded-2xl p-8">
              <p className="text-amber-400 text-sm font-bold uppercase mb-3 tracking-wide">Payback Period</p>
              <p className="text-6xl font-bold text-white mb-3">{result.paybackPeriod}</p>
              <p className="text-gray-400 mb-4">meses para recuperar investimento</p>
              <div className="pt-4 border-t border-amber-600/30">
                <p className="text-sm text-gray-300">
                  {result.paybackPeriod <= 3 ? '🚀 Excelente' : result.paybackPeriod <= 6 ? '✅ Bom' : '⚠️ Atenção'}:
                  {result.paybackPeriod <= 3 ? ' retorno rápido' : result.paybackPeriod <= 6 ? ' retorno saudável' : ' retorno lento'}
                </p>
              </div>
            </div>

            {/* ROI */}
            <div className="card-premium rounded-2xl p-8">
              <p className="text-amber-400 text-sm font-bold uppercase mb-3 tracking-wide">ROI Mensal</p>
              <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-3">{result.roi}%</p>
              <p className="text-gray-400 mb-4">retorno sobre investimento</p>
              <div className="pt-4 border-t border-amber-600/30">
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
          <div className="card-premium rounded-2xl p-8 space-y-8">
            {/* Revenue Comparison */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-white font-semibold">Receita Mensal</span>
                <span className="text-amber-400 text-sm font-bold">+{Math.round(((result.potentialRevenue - (result.potentialRevenue - result.monthlyLoss)) / (result.potentialRevenue - result.monthlyLoss)) * 100)}%</span>
              </div>
              <div className="relative h-12 bg-gray-800/50 rounded-xl overflow-hidden border border-amber-600/30">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center px-4 transition-all duration-1000 w-[70%]">
                  <span className="text-white text-sm font-bold">{formatCurrency(result.potentialRevenue - result.monthlyLoss)}</span>
                </div>
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-end px-4 transition-all duration-1000 delay-300 w-full">
                  <span className="text-black text-sm font-bold">{formatCurrency(result.potentialRevenue)}</span>
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
                <span className="text-amber-400 text-sm font-bold">+{Math.round(((result.estimatedLeads - result.currentLeads) / result.currentLeads) * 100)}%</span>
              </div>
              <div className="relative h-12 bg-gray-800/50 rounded-xl overflow-hidden border border-amber-600/30">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center px-4"
                  style={{ width: `${(result.currentLeads / result.estimatedLeads) * 100}%` }}
                >
                  <span className="text-white text-sm font-bold">{result.currentLeads}</span>
                </div>
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-end px-4"
                  style={{ width: '100%' }}
                >
                  <span className="text-black text-sm font-bold">{result.estimatedLeads}</span>
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
                <span className="text-amber-400 text-sm font-bold">+{Math.round(((result.estimatedSales - result.currentSales) / result.currentSales) * 100)}%</span>
              </div>
              <div className="relative h-12 bg-gray-800/50 rounded-xl overflow-hidden border border-amber-600/30">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center px-4"
                  style={{ width: `${(result.currentSales / result.estimatedSales) * 100}%` }}
                >
                  <span className="text-white text-sm font-bold">{result.currentSales}</span>
                </div>
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-end px-4"
                  style={{ width: '100%' }}
                >
                  <span className="text-black text-sm font-bold">{result.estimatedSales}</span>
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
          <div className="card-premium rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-amber-600/30 rounded-xl p-6">
                  <p className="text-amber-400 text-sm font-bold mb-2">MÊS 1</p>
                  <p className="text-3xl font-bold text-white mb-1">{formatCurrency(timeline.month1)}</p>
                  <p className="text-xs text-gray-400">+5% vs. atual</p>
                </div>
                {/* Connection Line */}
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-amber-600/50 to-transparent"></div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-amber-500/30 rounded-xl p-6">
                  <p className="text-amber-400 text-sm font-bold mb-2">MÊS 3</p>
                  <p className="text-3xl font-bold text-white mb-1">{formatCurrency(timeline.month3)}</p>
                  <p className="text-xs text-gray-400">+15% vs. atual</p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-400/20 to-amber-400/20 border border-yellow-400/30 rounded-xl p-6">
                  <p className="text-yellow-400 text-sm font-bold mb-2">MÊS 6</p>
                  <p className="text-3xl font-bold text-white mb-1">{formatCurrency(timeline.month6)}</p>
                  <p className="text-xs text-gray-400">+25% vs. atual</p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-yellow-400/50 to-transparent"></div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-yellow-300/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
                  <p className="gold-text text-sm font-bold mb-2">MÊS 12</p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-1">{formatCurrency(timeline.month12)}</p>
                  <p className="text-xs text-gray-400">Meta completa</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-amber-600/30">
              <p className="text-gray-300 text-center">
                💡 <span className="font-semibold text-white">Projeção conservadora</span> baseada em implementação gradual do sistema de previsibilidade
              </p>
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-white mb-8">Seu Plano de Ação Personalizado</h3>
          <div className="bg-gradient-to-br from-amber-950/40 to-yellow-950/40 backdrop-blur-xl border border-amber-600/40 rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Recomendações baseadas no seu nível: <span className="gold-text">{result.predictability}</span></h4>
                <p className="text-gray-300">Siga estas ações na ordem para maximizar resultados</p>
              </div>
            </div>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-4 bg-gray-900/50 rounded-xl p-5 border border-amber-600/30">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shrink-0 font-bold text-black text-sm">
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
          <div className="card-premium rounded-2xl p-10">
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
            <div className="bg-gradient-to-br from-gray-900/50 to-black/30 border border-amber-600/30 rounded-xl p-6">
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
            <div className="card-premium rounded-2xl p-8">
              <p className="text-amber-400 text-sm font-bold uppercase mb-3 tracking-wide">Vendas por mês</p>
              <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-2">{result.currentSales}</p>
              <p className="text-gray-400">vendas/mês atuais</p>
            </div>
            <div className="card-premium rounded-2xl p-8">
              <p className="text-amber-400 text-sm font-bold uppercase mb-3 tracking-wide">Leads por mês</p>
              <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-2">{result.currentLeads}</p>
              <p className="text-gray-400">leads/mês atuais</p>
            </div>
            <div className="card-premium rounded-2xl p-8">
              <p className="text-amber-400 text-sm font-bold uppercase mb-3 tracking-wide">Custo de Aquisição</p>
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-2">{formatCurrency(result.currentCAC)}</p>
              <p className="text-gray-400">por cliente adquirido</p>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {result.warnings.length > 0 && (
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-red-950/30 backdrop-blur-xl border border-red-600/40 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-4xl">⚠️</span> Pontos Críticos de Atenção
              </h3>
              <div className="space-y-4">
                {result.warnings.map((warning, index) => (
                  <div key={index} className="bg-red-900/20 border border-red-600/40 rounded-xl p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-600/40 flex items-center justify-center shrink-0 font-bold text-red-300">
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
            Você tem <span className="gold-text">{formatCurrency(result.monthlyLoss)}</span> não capturados todo mês. Meu trabalho é transformar esse valor em receita previsível, com responsabilidade e transparência.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-premium rounded-2xl p-6 group hover-lift">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-black font-bold shadow-gold">1</div>
                <h4 className="text-xl font-bold text-white">Plano de 90 dias com metas claras</h4>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Meta financeira: recuperar {formatCurrency(result.monthlyLoss)} e atingir {formatCurrency(result.potentialRevenue)}.</li>
                <li>Metas operacionais: leads/mês de {result.currentLeads} → {result.estimatedLeads}, vendas de {result.currentSales} → {result.estimatedSales}.</li>
                <li>Payback estimado: {result.paybackPeriod} meses com ROI projetado de {result.roi}%.</li>
              </ul>
            </div>

            <div className="card-premium rounded-2xl p-6 group hover-lift">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black font-bold shadow-gold">2</div>
                <h4 className="text-xl font-bold text-white">Execução ponta a ponta</h4>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Pesquisa, estratégia e segmentação para reduzir CPL (hoje: {formatCurrency(result.costPerLead)}).</li>
                <li>Criação e testes de criativos, landing pages e ofertas (CRO) para elevar conversão.</li>
                <li>Orquestração com CRM/funil para que cada lead gere vendas reais, não só cliques.</li>
              </ul>
            </div>

            <div className="card-premium rounded-2xl p-6 group hover-lift">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black font-bold shadow-gold">3</div>
                <h4 className="text-xl font-bold text-white">Transparência e governança</h4>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Dashboards semanais: investimentos, CPL, CAC, ROI e LTV.</li>
                <li>Reunião quinzenal com plano de ação e próximos testes.</li>
                <li>Orçamento controlado com teto e alertas para evitar desperdício.</li>
              </ul>
            </div>

            <div className="card-premium rounded-2xl p-6 group hover-lift">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-black font-bold shadow-gold">4</div>
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
          <div className="relative bg-gradient-to-br from-gray-950/90 to-black/90 border border-amber-600/40 rounded-3xl p-12 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/15 via-amber-600/15 to-transparent blur-3xl"></div>
            <div className="relative">
              <div className="mb-8 text-center">
                <div className="text-6xl mb-6">🚀</div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Pronto para recuperar <span className="gold-text">{formatCurrency(result.monthlyLoss)}</span>?
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
                  className="inline-flex items-center gap-3 btn-premium rounded-full px-10 py-5 text-lg font-semibold shadow-gold-lg hover:shadow-gold-glow"
                >
                  Agendar conversa gratuita
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>

                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
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
