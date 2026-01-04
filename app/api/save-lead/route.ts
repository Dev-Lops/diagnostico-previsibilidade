export async function POST(req: Request) {
  try {
    const { formData, result } = await req.json()

    // URL do Google Apps Script Web App
    const GOOGLE_SCRIPT_URL =
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      process.env.GOOGLE_SCRIPT_URL ||
      ''

    if (!GOOGLE_SCRIPT_URL) {
      console.warn('Google Script URL não configurada - dados não salvos')
      return Response.json({
        success: true,
        saved: false,
        reason: 'missing_script_url',
      })
    }

    const conversionPct =
      typeof formData?.conversionRate === 'number'
        ? `${(formData.conversionRate * 100).toFixed(2)}%`
        : ''

    const currentRevenue = result?.potentialRevenue - result?.monthlyLoss
    const timeline = result?.timeline ?? {
      month1: Math.round(currentRevenue * 1.05),
      month3: Math.round(currentRevenue * 1.15),
      month6: Math.round(currentRevenue * 1.25),
      month12: Math.round(result?.potentialRevenue ?? 0),
    }

    const dataToSave = {
      // Lead
      timestamp: new Date().toISOString(),
      name: formData?.name ?? '',
      email: formData?.email ?? '',
      whatsapp: formData?.whatsapp || 'Não informado',

      // Dados do negócio
      revenue: formData?.revenue ?? '',
      ticket: formData?.ticket ?? '',
      mainAcquisition: formData?.mainAcquisition ?? '',
      marketingInvestment: formData?.marketingInvestment ?? '',
      conversionRate: conversionPct,
      serviceCapacity: formData?.serviceCapacity ?? 'Sem limite',

      // Diagnóstico
      monthlyLoss: result?.monthlyLoss ?? '',
      potentialRevenue: result?.potentialRevenue ?? '',
      recommendedInvestment: result?.recommendedInvestment ?? '',
      estimatedLeads: result?.estimatedLeads ?? '',
      estimatedSales: result?.estimatedSales ?? '',
      currentCAC: result?.currentCAC ?? '',
      costPerLead: result?.costPerLead ?? '',
      currentLTV: result?.currentLTV ?? '',
      projectedLTV: result?.projectedLTV ?? '',
      paybackPeriod: result?.paybackPeriod ?? '',
      roi: result?.roi ?? '',
      predictability: result?.predictability ?? '',
      warnings: Array.isArray(result?.warnings)
        ? result.warnings.join(' | ')
        : '',

      // Timeline
      timeline_m1: timeline.month1,
      timeline_m3: timeline.month3,
      timeline_m6: timeline.month6,
      timeline_m12: timeline.month12,

      status: 'Novo lead',
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSave),
    })

    if (!response.ok) {
      throw new Error('Erro ao salvar no Google Sheets')
    }

    return Response.json({ success: true, saved: true })
  } catch (error) {
    console.error('Erro ao salvar lead:', error)
    // Não falha o fluxo do usuário, apenas loga o erro
    return Response.json({ success: true, saved: false, error: String(error) })
  }
}
