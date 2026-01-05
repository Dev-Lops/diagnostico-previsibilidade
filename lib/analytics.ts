// Configuração padrão para Google Analytics
// Este arquivo deve ser atualizado com seu ID de rastreamento real

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GOOGLE_ANALYTICS_ID, {
      page_path: url,
    })
  }
}

export const event = (
  action: string,
  params?: Record<string, string | number>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params)
  }
}

// Eventos customizados específicos do projeto
export const trackFormStart = () => {
  event('form_start', {
    form_name: 'diagnostic_form',
  })
}

export const trackFormComplete = () => {
  event('form_submit', {
    form_name: 'diagnostic_form',
  })
}

export const trackResultView = (predictabilityLevel: string) => {
  event('view_result', {
    predictability_level: predictabilityLevel,
  })
}

export const trackCTAClick = (cta_name: string) => {
  event('cta_click', {
    cta_name,
  })
}
