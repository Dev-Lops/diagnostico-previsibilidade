'use client'

import type { FormData, MainAcquisition } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Nota: Metadata não pode ser exportada em 'use client' 
// Esta será gerenciada pelo layout parent ou via estrutura de páginas

const STEPS = [
  { id: 1, title: 'Seus dados', description: 'Para enviarmos seu diagnóstico' },
  { id: 2, title: 'Seu negócio', description: 'Informações básicas' },
  { id: 3, title: 'Marketing', description: 'Investimentos e conversão' },
]

export default function DiagnosticoPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    whatsapp: '',
    revenue: 0,
    ticket: 0,
    mainAcquisition: 'indication',
    marketingInvestment: 0,
    conversionRate: 0.02,
    serviceCapacity: undefined,
  })

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Por favor, digite seu nome'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Por favor, digite seu e-mail'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Digite um e-mail válido (ex: seu@email.com)'
      }
    }

    if (step === 2) {
      if (formData.revenue <= 0) {
        newErrors.revenue = 'Digite seu faturamento mensal (ex: 50000)'
      }
      if (formData.ticket <= 0) {
        newErrors.ticket = 'Digite o valor médio de cada venda'
      }
      if (formData.ticket > formData.revenue) {
        newErrors.ticket = 'O ticket médio não pode ser maior que o faturamento total'
      }
    }

    if (step === 3) {
      if (formData.marketingInvestment < 0) {
        newErrors.marketingInvestment = 'Digite 0 se não investe em marketing'
      }
      if (
        formData.conversionRate &&
        (formData.conversionRate <= 0 || formData.conversionRate > 1)
      ) {
        newErrors.conversionRate = 'Digite um valor entre 0 e 100 (ex: 2 para 2%)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          revenue: formData.revenue,
          ticket: formData.ticket,
          marketingInvestment: formData.marketingInvestment,
          conversionRate: formData.conversionRate,
          serviceCapacity: formData.serviceCapacity,
          mainAcquisition: formData.mainAcquisition,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao calcular diagnóstico')
      }

      const result = await response.json()

      // Salva os dados do lead (não bloqueia o fluxo se falhar)
      try {
        await fetch('/api/save-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formData,
            result,
          }),
        })
      } catch (error) {
        console.error('Erro ao salvar lead:', error)
        // Continua mesmo se falhar ao salvar
      }

      // Salva no localStorage para a próxima página
      localStorage.setItem('diagnosticResult', JSON.stringify(result))
      localStorage.setItem('diagnosticForm', JSON.stringify(formData))

      router.push('/resultado')
    } catch {
      setErrors({ submit: 'Erro ao processar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: keyof FormData, value: string | number | MainAcquisition | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpa erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="min-h-screen bg-premium-dark py-8 sm:py-12 px-4 relative overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-gradient-to-br from-amber-600/20 via-amber-700/10 to-transparent blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-0 w-24 h-24 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-gradient-to-tr from-amber-700/15 to-transparent blur-3xl animate-float delay-500"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Progress Bar - Premium Gold */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex-1 ${step.id < STEPS.length ? 'mr-2' : ''}`}
              >
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${step.id <= currentStep
                    ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400'
                    : 'bg-gray-800/50'
                    }`}
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-xs sm:text-sm text-amber-400 font-semibold tracking-widest">
              PASSO {currentStep} DE {STEPS.length}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              {STEPS[currentStep - 1].title}
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mt-2">
              {STEPS[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Form Card - Premium Black & Gold */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/30 via-amber-600/30 to-yellow-500/30 rounded-3xl blur opacity-50 group-hover:opacity-70 transition duration-500"></div>
          <div className="relative bg-gradient-to-b from-gray-950/95 to-black/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-amber-600/40">
            {/* Passo 1: Dados pessoais */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-amber-400 mb-2 tracking-wide">
                    NOME COMPLETO *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-500/70 bg-red-950/20' : 'border-amber-600/50 bg-gray-900/50'
                      } text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition`}
                    placeholder="Ex: João Silva"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-amber-400 mb-2 tracking-wide">
                    E-MAIL *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 text-sm ${errors.email ? 'border-red-500/70 bg-red-950/20' : 'border-amber-600/50 bg-gray-900/50'
                      } text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition`}
                    placeholder="seu@email.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-amber-400 mb-2 tracking-wide">
                    WHATSAPP (OPCIONAL)
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-600/50 bg-gray-900/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            )}

            {/* Passo 2: Dados do negócio */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-2 tracking-wide">
                    FATURAMENTO MENSAL ATUAL (R$) *
                  </label>
                  <input
                    type="number"
                    value={formData.revenue || ''}
                    onChange={(e) =>
                      updateField('revenue', parseFloat(e.target.value) || 0)
                    }
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.revenue ? 'border-red-500/70 bg-red-950/20' : 'border-amber-600/50 bg-gray-900/50'
                      } text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition`}
                    placeholder="50000"
                  />
                  {errors.revenue && (
                    <p className="text-red-400 text-sm mt-1">{errors.revenue}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    💡 Digite apenas números. Ex: R$ 50 mil = 50000
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-2 tracking-wide">
                    TICKET MÉDIO (R$) *
                  </label>
                  <input
                    type="number"
                    value={formData.ticket || ''}
                    onChange={(e) =>
                      updateField('ticket', parseFloat(e.target.value) || 0)
                    }
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.ticket ? 'border-red-500/70 bg-red-950/20' : 'border-amber-600/50 bg-gray-900/50'
                      } text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition`}
                    placeholder="Ex: 5000"
                  />
                  {errors.ticket && (
                    <p className="text-red-400 text-sm mt-1">{errors.ticket}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    💡 Quanto cada cliente paga em média?
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-2 tracking-wide">
                    PRINCIPAL CANAL DE AQUISIÇÃO *
                  </label>
                  <select
                    title='name'
                    value={formData.mainAcquisition}
                    onChange={(e) =>
                      updateField(
                        'mainAcquisition',
                        e.target.value as MainAcquisition
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-600/50 bg-gray-900/50 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                  >
                    <option value="indication" className="bg-gray-900">Indicações</option>
                    <option value="ads" className="bg-gray-900">Anúncios pagos</option>
                    <option value="organic" className="bg-gray-900">Tráfego orgânico</option>
                  </select>
                </div>
              </div>
            )}

            {/* Passo 3: Marketing */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-2 tracking-wide">
                    INVESTIMENTO MENSAL EM MARKETING (R$) *
                  </label>
                  <input
                    type="number"
                    value={formData.marketingInvestment || ''}
                    onChange={(e) =>
                      updateField(
                        'marketingInvestment',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.marketingInvestment
                      ? 'border-red-500/70 bg-red-950/20'
                      : 'border-amber-600/50 bg-gray-900/50'
                      } text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition`}
                    placeholder="Ex: 5000 (ou 0 se não investe)"
                  />
                  {errors.marketingInvestment && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.marketingInvestment}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    📊 Soma de anúncios, ferramentas, agência, etc.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-2 tracking-wide">
                    TAXA DE CONVERSÃO (%) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={
                      formData.conversionRate
                        ? formData.conversionRate * 100
                        : ''
                    }
                    onChange={(e) =>
                      updateField(
                        'conversionRate',
                        parseFloat(e.target.value) / 100 || 0.02
                      )
                    }
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.conversionRate
                      ? 'border-red-500/70 bg-red-950/20'
                      : 'border-amber-600/50 bg-gray-900/50'
                      } text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition`}
                    placeholder="2"
                  />
                  {errors.conversionRate && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.conversionRate}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    🎯 A cada 100 pessoas interessadas, quantas compram? (Digite o número)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-2 tracking-wide">
                    CAPACIDADE DE ATENDIMENTO/MÊS (OPCIONAL)
                  </label>
                  <input
                    type="number"
                    value={formData.serviceCapacity || ''}
                    onChange={(e) =>
                      updateField(
                        'serviceCapacity',
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-600/50 bg-gray-900/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    placeholder="Ex: 20 (deixe vazio se não tem limite)"
                  />
                  <p className="text-gray-400 text-xs mt-1">
                    👥 Quantos novos clientes você consegue atender bem por mês?
                  </p>
                </div>
              </div>
            )}

            {/* Error message */}
            {errors.submit && (
              <div className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
                <p className="text-red-300 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  disabled={loading}
                  className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border-2 border-amber-600/50 text-amber-400 font-semibold text-sm sm:text-base hover:bg-amber-600/10 transition-all disabled:opacity-50"
                >
                  ← Voltar
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={loading}
                className="group relative w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-500 group-hover:scale-105 transition-transform"></div>
                <span className="relative text-black font-bold text-sm sm:text-base flex items-center justify-center">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 sm:h-5 w-4 sm:w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Analisando...
                    </>
                  ) : currentStep === 3 ? (
                    'Ver meu diagnóstico ✨'
                  ) : (
                    'Próximo →'
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 text-center">
          <p className="text-sm text-amber-400/70">
            🔒 Seus dados estão seguros • Não compartilhamos suas informações
          </p>
        </div>
      </div>
    </div>
  )
}
