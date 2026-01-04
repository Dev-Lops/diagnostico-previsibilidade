// Tipos compartilhados em todo o app

export type MainAcquisition = 'indication' | 'ads' | 'organic'

export type PredictabilityLevel = 'Baixa' | 'Média' | 'Alta'

export interface FormData {
  // Passo 1: Informações básicas
  name: string
  email: string
  whatsapp?: string

  // Passo 2: Dados do negócio
  revenue: number
  ticket: number
  mainAcquisition: MainAcquisition

  // Passo 3: Marketing e conversão
  marketingInvestment: number
  conversionRate?: number
  serviceCapacity?: number
}

export interface DiagnosticResponse {
  // Métricas atuais
  currentSales: number
  currentLeads: number
  currentCAC: number
  costPerLead: number

  // Projeções
  monthlyLoss: number
  potentialRevenue: number
  recommendedInvestment: number
  estimatedLeads: number
  estimatedSales: number

  // Métricas avançadas
  currentLTV: number
  projectedLTV: number
  paybackPeriod: number
  roi: number

  // Timeline
  timeline: {
    month1: number
    month3: number
    month6: number
    month12: number
  }

  // Score
  predictability: PredictabilityLevel

  // Alertas
  warnings: string[]

  // Recomendações
  recommendations: string[]
}
