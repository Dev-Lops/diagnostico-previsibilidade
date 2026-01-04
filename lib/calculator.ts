export type DiagnosticInput = {
  revenue: number // faturamento mensal atual
  ticket: number // ticket médio
  marketingInvestment: number // investimento atual em marketing
  conversionRate?: number // taxa de conversão (ex: 0.02 = 2%)
  serviceCapacity?: number // capacidade de atendimento mensal
  mainAcquisition: 'indication' | 'ads' | 'organic'
}

export type DiagnosticResult = {
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
  paybackPeriod: number // meses para recuperar investimento
  roi: number // retorno sobre investimento (%)

  // Timeline
  timeline: {
    month1: number
    month3: number
    month6: number
    month12: number
  }

  // Score
  predictability: 'Baixa' | 'Média' | 'Alta'

  // Alertas
  warnings: string[]

  // Recomendações personalizadas
  recommendations: string[]
}

/**
 * Valida os dados de entrada
 * @throws Error se os dados forem inválidos
 */
function validateInput(input: DiagnosticInput): void {
  const { revenue, ticket, marketingInvestment, conversionRate } = input

  if (revenue <= 0) {
    throw new Error('Faturamento deve ser maior que zero')
  }

  if (ticket <= 0) {
    throw new Error('Ticket médio deve ser maior que zero')
  }

  if (ticket > revenue) {
    throw new Error('Ticket médio não pode ser maior que o faturamento mensal')
  }

  if (marketingInvestment < 0) {
    throw new Error('Investimento em marketing não pode ser negativo')
  }

  if (
    conversionRate !== undefined &&
    (conversionRate <= 0 || conversionRate > 1)
  ) {
    throw new Error(
      'Taxa de conversão deve estar entre 0 e 1 (ex: 0.02 para 2%)'
    )
  }
}

/**
 * Calcula diagnóstico completo de previsibilidade
 * Fórmulas conservadoras, sem promessas irreais
 */
export function calculate(input: DiagnosticInput): DiagnosticResult {
  // Validação
  validateInput(input)

  const {
    revenue,
    ticket,
    marketingInvestment,
    conversionRate = 0.02, // padrão: 2%
    serviceCapacity,
    mainAcquisition,
  } = input

  const warnings: string[] = []

  // Métricas atuais
  const currentSales = revenue / ticket
  const currentLeads = currentSales / conversionRate
  const currentCAC = currentSales > 0 ? marketingInvestment / currentSales : 0

  // Edge case: conversão muito baixa
  if (conversionRate < 0.01) {
    warnings.push(
      'Taxa de conversão abaixo de 1% - processo comercial precisa de atenção'
    )
  }

  // Edge case: CAC muito alto
  if (currentCAC > ticket * 0.3) {
    warnings.push(
      'CAC representa mais de 30% do ticket - lucratividade comprometida'
    )
  }

  // Crescimento conservador (30%)
  const potentialRevenue = revenue * 1.3
  const potentialSales = potentialRevenue / ticket
  const requiredLeads = potentialSales / conversionRate

  // Edge case: capacidade de atendimento
  if (serviceCapacity && potentialSales > serviceCapacity) {
    warnings.push(
      `Meta de ${Math.round(
        potentialSales
      )} vendas excede capacidade de ${serviceCapacity} atendimentos/mês`
    )
  }

  // Investimento recomendado (10% mais eficiente que o atual)
  let recommendedInvestment = 0
  if (currentCAC > 0) {
    recommendedInvestment = requiredLeads * (currentCAC * 0.9)
  } else {
    // Se não tem histórico de CAC, estima baseado no ticket
    const estimatedCAC = ticket * 0.15 // 15% do ticket
    recommendedInvestment = requiredLeads * estimatedCAC
    warnings.push(
      'Sem histórico de CAC - investimento estimado conservadoramente'
    )
  }

  const monthlyLoss = potentialRevenue - revenue

  // Cálculos avançados
  const costPerLead = currentLeads > 0 ? marketingInvestment / currentLeads : 0

  // LTV (Lifetime Value) - considerando retenção média de 12 meses
  const averageRetentionMonths = 12
  const currentLTV = ticket * averageRetentionMonths
  const projectedLTV = ticket * averageRetentionMonths * 1.2 // 20% de melhoria com sistema previsível

  // Payback Period - meses para recuperar o investimento
  const monthlyProfit = monthlyLoss * 0.3 // margem de 30%
  const paybackPeriod =
    recommendedInvestment > 0 ? recommendedInvestment / monthlyProfit : 0

  // ROI (Return on Investment)
  const roi =
    recommendedInvestment > 0 ? (monthlyLoss / recommendedInvestment) * 100 : 0

  // Timeline de crescimento (projeção conservadora)
  const timeline = {
    month1: Math.round(revenue * 1.05), // 5% no primeiro mês
    month3: Math.round(revenue * 1.15), // 15% em 3 meses
    month6: Math.round(revenue * 1.25), // 25% em 6 meses
    month12: Math.round(potentialRevenue), // meta completa em 12 meses
  }

  // Score de previsibilidade (lógica refinada)
  let predictability: 'Baixa' | 'Média' | 'Alta' = 'Baixa'

  if (mainAcquisition === 'indication' && marketingInvestment === 0) {
    predictability = 'Baixa'
    warnings.push('Dependência total de indicações reduz previsibilidade')
  } else if (
    mainAcquisition === 'organic' &&
    marketingInvestment < revenue * 0.05
  ) {
    predictability = 'Baixa'
    warnings.push('Tráfego orgânico sem investimento é instável')
  } else if (mainAcquisition === 'ads' && marketingInvestment > 0) {
    if (conversionRate >= 0.03 && currentCAC < ticket * 0.25) {
      predictability = 'Alta'
    } else if (conversionRate >= 0.02) {
      predictability = 'Média'
    } else {
      predictability = 'Baixa'
      warnings.push('Anúncios com conversão baixa reduzem previsibilidade')
    }
  }

  // Recomendações personalizadas baseadas na análise
  const recommendations: string[] = []

  if (predictability === 'Baixa') {
    recommendations.push(
      '🎯 Prioridade 1: Implementar funil de vendas estruturado com etapas claras'
    )
    recommendations.push(
      '📊 Prioridade 2: Criar dashboard de métricas para acompanhamento diário'
    )
    recommendations.push(
      '💰 Prioridade 3: Começar testes pagos com orçamento controlado (5-10% da receita)'
    )
    recommendations.push(
      '🔄 Prioridade 4: Implementar processo de follow-up automatizado'
    )
  } else if (predictability === 'Média') {
    recommendations.push(
      '🚀 Otimizar funil atual: identificar gargalos e pontos de abandono'
    )
    recommendations.push(
      '📈 Aumentar investimento em canais que já performam (escalar o que funciona)'
    )
    recommendations.push(
      '🎯 Melhorar qualificação de leads para aumentar taxa de conversão'
    )
    recommendations.push(
      '💡 Testar novos canais de aquisição com 20% do budget'
    )
  } else {
    recommendations.push(
      '⚡ Escalar operação: você tem fundação sólida para crescer'
    )
    recommendations.push(
      '🎓 Investir em treinamento da equipe comercial para manter taxa de conversão'
    )
    recommendations.push(
      '🔧 Automatizar processos repetitivos para ganhar eficiência'
    )
    recommendations.push(
      '📊 Implementar testes A/B contínuos para otimização incremental'
    )
  }

  // Recomendações baseadas em métricas específicas
  if (costPerLead > ticket * 0.1) {
    recommendations.push(
      '⚠️ Custo por lead alto: revisar segmentação e criativos de anúncios'
    )
  }

  if (conversionRate < 0.02) {
    recommendations.push(
      '🎯 Conversão baixa: melhorar script de vendas e qualificação de leads'
    )
  }

  if (currentCAC > ticket * 0.25) {
    recommendations.push(
      '💰 CAC elevado: focar em otimização antes de escalar investimento'
    )
  }

  return {
    // Métricas atuais
    currentSales: Math.round(currentSales),
    currentLeads: Math.round(currentLeads),
    currentCAC: Math.round(currentCAC),
    costPerLead: Math.round(costPerLead),

    // Projeções
    monthlyLoss: Math.round(monthlyLoss),
    potentialRevenue: Math.round(potentialRevenue),
    recommendedInvestment: Math.round(recommendedInvestment),
    estimatedLeads: Math.round(requiredLeads),
    estimatedSales: Math.round(potentialSales),

    // Métricas avançadas
    currentLTV: Math.round(currentLTV),
    projectedLTV: Math.round(projectedLTV),
    paybackPeriod: Math.round(paybackPeriod * 10) / 10, // 1 casa decimal
    roi: Math.round(roi),

    // Timeline
    timeline,

    // Score
    predictability,

    // Alertas
    warnings,

    // Recomendações
    recommendations,
  }
}
