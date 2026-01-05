import Script from "next/script";

export function SchemaOrgHome() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Diagnóstico de Previsibilidade",
    description: "Diagnóstico estratégico que revela quanto seu negócio está perdendo por falta de previsibilidade.",
    url: "https://diagnostico-previsibilidade.vercel.app",
    image: "https://diagnostico-previsibilidade.vercel.app/og-image.png",
    serviceType: "Business Consultation",
    areaServed: {
      "@type": "Country",
      name: "BR",
    },
    priceRange: "Free",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
      url: "https://diagnostico-previsibilidade.vercel.app/diagnostico",
      availability: "InStock",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de Diagnóstico",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Diagnóstico de Previsibilidade Gratuito",
          description: "Análise completa em 3 minutos sem cadastro",
          url: "https://diagnostico-previsibilidade.vercel.app/diagnostico",
          price: "0",
          priceCurrency: "BRL",
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "120",
    },
  };

  return (
    <Script
      id="schema-home"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

export function SchemaOrgBreadcrumb(items: { name: string; url: string }[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="schema-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

export function SchemaOrgOrganization() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dev-Lops",
    url: "https://diagnostico-previsibilidade.vercel.app",
    image: "https://diagnostico-previsibilidade.vercel.app/og-image.png",
    sameAs: [
      "https://twitter.com/DevLops",
      "https://instagram.com/DevLops",
      "https://linkedin.com/company/dev-lops",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "contato@devlops.com",
      availableLanguage: ["pt-BR"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
    },
  };

  return (
    <Script
      id="schema-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

export function SchemaOrgFAQ(faqs: { question: string; answer: string }[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="schema-faq"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
