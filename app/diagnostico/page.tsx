'use client'

import type { FormData, MainAcquisition } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
    <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-pink-900/20 to-red-900/20 animate-gradient-shift"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex-1 ${step.id < STEPS.length ? 'mr-2' : ''}`}
              >
                <div
                  className={`h-2 rounded-full transition-all ${step.id <= currentStep
                    ? 'bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500'
                    : 'bg-gray-700'
                    }`}
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-cyan-300">
              Passo {currentStep} de {STEPS.length}
            </p>
            <h2 className="text-3xl font-bold text-white mt-1 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
              {STEPS[currentStep - 1].title}
            </h2>
            <p className="text-gray-300 text-sm mt-2">
              {STEPS[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-cyan-400 to-purple-500 rounded-3xl blur opacity-40 group-hover:opacity-70 transition duration-500 animate-glow"></div>
          <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-cyan-500/30">
            {/* Passo 1: Dados pessoais */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-cyan-500/50'
                      } bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
                    placeholder="Ex: João Silva"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-cyan-500/50'
                      } bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
                    placeholder="seu@email.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    WhatsApp (opcional)
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-cyan-500/50 bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            )}

            {/* Passo 2: Dados do negócio */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Faturamento mensal atual (R$) *
                  </label>
                  <input
                    type="number"
                    value={formData.revenue || ''}
                    onChange={(e) =>
                      updateField('revenue', parseFloat(e.target.value) || 0)
                    }
                    className={`w-full px-4 py-3 rounded-lg border ${errors.revenue ? 'border-red-500' : 'border-cyan-500/50'
                      } bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
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
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Ticket médio (R$) *
                  </label>
                  <input
                    type="number"
                    value={formData.ticket || ''}
                    onChange={(e) =>
                      updateField('ticket', parseFloat(e.target.value) || 0)
                    }
                    className={`w-full px-4 py-3 rounded-lg border ${errors.ticket ? 'border-red-500' : 'border-cyan-500/50'
                      } bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
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
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Principal canal de aquisição *
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
                    className="w-full px-4 py-3 rounded-lg border border-cyan-500/50 bg-gray-800/50 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                  >
                    <option value="indication" className="bg-gray-800">Indicações</option>
                    <option value="ads" className="bg-gray-800">Anúncios pagos</option>
                    <option value="organic" className="bg-gray-800">Tráfego orgânico</option>
                  </select>
                </div>
              </div>
            )}

            {/* Passo 3: Marketing */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Investimento mensal em marketing (R$) *
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
                    className={`w-full px-4 py-3 rounded-lg border ${errors.marketingInvestment
                      ? 'border-red-500'
                      : 'border-cyan-500/50'
                      } bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
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
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Taxa de conversão (%) *
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
                    className={`w-full px-4 py-3 rounded-lg border ${errors.conversionRate
                      ? 'border-red-500'
                      : 'border-cyan-500/50'
                      } bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
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
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Capacidade de atendimento/mês (opcional)
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
                    className="w-full px-4 py-3 rounded-lg border border-cyan-500/50 bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
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
            <div className="mt-8 flex gap-4">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1 px-6 py-3 rounded-lg border border-cyan-500/50 text-cyan-300 font-semibold hover:bg-cyan-500/10 transition-all disabled:opacity-50"
                >
                  Voltar
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={loading}
                className="group relative flex-1 px-6 py-3 rounded-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 group-hover:scale-105 transition-transform"></div>
                <span className="relative text-white font-bold text-lg flex items-center justify-center">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
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
                      Calculando...
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
          <p className="text-sm text-cyan-300/70">
            🔒 Seus dados estão seguros • Não compartilhamos suas informações
          </p>
        </div>
      </div>
    </div>
  )
}
