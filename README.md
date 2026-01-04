# 🎯 Diagnóstico de Previsibilidade

Ferramenta de diagnóstico que mostra ao cliente o quanto ele está perdendo por não ter previsibilidade nas vendas.

## 🚀 Stack Técnica

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS
- **Deploy**: Vercel (recomendado)

## 📁 Estrutura do Projeto

```
/app
  /page.tsx                    # Landing page
  /diagnostico/page.tsx        # Form multi-step
  /resultado/page.tsx          # Tela de resultados
  /api/diagnostic/route.ts     # API de cálculo
  /layout.tsx                  # Layout global

/lib
  /calculator.ts               # Lógica de cálculo e validações
  /types.ts                    # Tipos TypeScript compartilhados
```

## 🧮 Lógica de Cálculo

### Métricas Calculadas

1. **Situação Atual**

   - Vendas mensais = Faturamento / Ticket médio
   - Leads mensais = Vendas / Taxa de conversão
   - CAC = Investimento marketing / Vendas

2. **Projeções (crescimento conservador de 30%)**

   - Potencial de faturamento = Faturamento atual × 1.3
   - Perda mensal = Potencial - Faturamento atual
   - Leads necessários para meta
   - Investimento recomendado

3. **Score de Previsibilidade**
   - **Alta**: Anúncios + conversão ≥3% + CAC saudável
   - **Média**: Anúncios com conversão ≥2%
   - **Baixa**: Dependência de indicações ou tráfego orgânico instável

### Validações e Edge Cases

- ✅ Ticket não pode ser maior que faturamento
- ✅ Conversão abaixo de 1% gera alerta
- ✅ CAC acima de 30% do ticket gera alerta
- ✅ Validação de capacidade de atendimento
- ✅ Cálculo alternativo quando não há histórico de CAC

## 🎨 Fluxo do Usuário

1. **Landing Page** → Headline focada em dor (o que está perdendo)
2. **Form Passo 1** → Dados pessoais
3. **Form Passo 2** → Dados do negócio
4. **Form Passo 3** → Marketing e conversão
5. **Resultado** → Diagnóstico visual + CTA para Calendly

## 🔧 Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Rodar produção localmente
npm run start
```

## 📊 Tipos TypeScript

```typescript
// FormData - Dados do formulário
interface FormData {
  name: string
  email: string
  whatsapp?: string
  revenue: number
  ticket: number
  mainAcquisition: 'indication' | 'ads' | 'organic'
  marketingInvestment: number
  conversionRate?: number
  serviceCapacity?: number
}

// DiagnosticResponse - Retorno da API
interface DiagnosticResponse {
  currentSales: number
  currentLeads: number
  currentCAC: number
  monthlyLoss: number
  potentialRevenue: number
  recommendedInvestment: number
  estimatedLeads: number
  estimatedSales: number
  predictability: 'Baixa' | 'Média' | 'Alta'
  warnings: string[]
}
```

## 🎯 Próximos Passos

Veja [CHECKLIST-PRODUCAO.md](./CHECKLIST-PRODUCAO.md) para o plano de 7 dias até o lançamento.

## ⚠️ Pontos Importantes

### Linguagem

- ✅ "Estimativa baseada nos dados informados"
- ✅ "Potencial de crescimento"
- ❌ NUNCA: "Você vai faturar X" ou "Garantimos Y"

### LGPD

- Dados são processados no cliente (localStorage)
- Não há banco de dados no MVP
- Para produção: adicionar política de privacidade

### CTA

- Um único objetivo: **agendar conversa no Calendly**
- Substituir link do Calendly em `/app/resultado/page.tsx` (linha 331)

## 🔗 Configurações Necessárias

1. **Calendly**: Atualizar link em `/app/resultado/page.tsx`
2. **Analytics**: Adicionar script em `/app/layout.tsx`
3. **SEO**: Configurar metadata para redes sociais
4. **Domínio**: Configurar no Vercel após deploy

## 📈 Métricas Esperadas

Meta inicial conservadora:

- 100 visitantes
- 30 iniciam diagnóstico (30%)
- 20 concluem (66% conclusão)
- 5 agendam conversa (25% conversão final)

**= 5% conversão final visitante → agendamento**

## 🛠️ Troubleshooting

### Problema: Erro ao calcular diagnóstico

**Solução**: Verificar console do navegador e logs da API

### Problema: Página em branco no resultado

**Solução**: Verificar se localStorage está disponível

### Problema: Estilos não carregam

**Solução**: Verificar se Tailwind está configurado corretamente

## 📝 License

MIT

---

**Desenvolvido para converter visitantes em reuniões agendadas** 🎯
