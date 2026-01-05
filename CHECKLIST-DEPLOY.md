# 🚀 CHECKLIST DE DEPLOY COM SEO

## PRÉ-DEPLOY (Fazer agora)

### Configuração Local

- [ ] Copiar `.env.example` para `.env.local`
- [ ] Preencher variáveis (URL, analytics ID, etc)
- [ ] Testar localmente: `npm run build && npm run start`
- [ ] Verificar console para erros
- [ ] Testar formulário de ponta a ponta

### Verificações SEO

- [ ] Verificar `public/sitemap.xml` (deve estar acessível)
- [ ] Verificar `public/robots.txt` (deve estar acessível)
- [ ] Criar imagem OG (1200x630px) e salvar em `/public/og-image.png`
- [ ] Verificar se meta tags aparecem no source do HTML
- [ ] Testar em https://www.seorch.com/ ou similar

### Build Final

```bash
npm run build
npm run start  # Testar produção localmente
```

---

## DEPLOY (Fazer no Vercel)

### Passo 1: Conectar Repositório

- [ ] Fazer login em [Vercel](https://vercel.com)
- [ ] Clicar em "Add New..." → "Project"
- [ ] Selecionar repositório GitHub
- [ ] Autorizar Vercel no GitHub

### Passo 2: Configurar Ambiente

- [ ] Adicionar variáveis de ambiente:
  - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` = G_XXXXXXXXXX
  - `NEXT_PUBLIC_APP_URL` = https://seu-dominio.com
  - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` = (se houver)

### Passo 3: Deploy

- [ ] Clicar em "Deploy"
- [ ] Esperar deploy completar
- [ ] Verificar preview URL funciona
- [ ] Testar formulário completo no preview

### Passo 4: Domínio Customizado

- [ ] Ir para "Settings" → "Domains"
- [ ] Adicionar domínio customizado
- [ ] Seguir instruções de DNS do seu registrador
- [ ] Aguardar propagação DNS (até 48h)

---

## PÓS-DEPLOY (Fazer após deploy com sucesso)

### Google Search Console (DIA 1)

1. [ ] Acessar https://search.google.com/search-console
2. [ ] Clique em "Adicionar propriedade"
3. [ ] Selecione tipo: URL prefix
4. [ ] Digite sua URL: `https://seu-dominio.com`
5. [ ] Método de verificação:
   - [ ] **Recomendado**: DNS TXT
   - [ ] Ou: Upload arquivo HTML em `/public/`
   - [ ] Ou: Meta tag no HTML
6. [ ] Verificar propriedade
7. [ ] Ir para "Sitemaps"
8. [ ] Clicar "Adicionar sitemap"
9. [ ] Digite: `https://seu-dominio.com/sitemap.xml`
10. [ ] Clicar "Enviar"

### Google Analytics 4 (DIA 1)

1. [ ] Acessar https://analytics.google.com
2. [ ] Clique em "Criar"
3. [ ] Preencha dados da propriedade
4. [ ] Selecione "Web"
5. [ ] URL: `https://seu-dominio.com`
6. [ ] Copie ID (G_XXXXXXXXXX)
7. [ ] Adicionar em Vercel → Settings → Environment Variables
8. [ ] Redeploy (ou revalidate cache)
9. [ ] Esperar 24h para primeiros dados

### Verificações de Performance (DIA 2)

1. [ ] Testar em [PageSpeed Insights](https://pagespeed.web.dev/)
   - [ ] Desktop score: Almeja > 90
   - [ ] Mobile score: Almeja > 80
2. [ ] Testar em [Lighthouse](https://developers.google.com/web/tools/lighthouse)
   - [ ] Performance > 90
   - [ ] Accessibility > 90
   - [ ] SEO > 95
3. [ ] Verificar Core Web Vitals em PageSpeed Insights

### Verificações de SEO (DIA 2-3)

1. [ ] Acessar seu site no navegador
2. [ ] View source → Ctrl+F → "og:title"
   - [ ] Deve encontrar todas as meta tags OG
3. [ ] Testar em [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [ ] Imagem OG deve aparecer
   - [ ] Título e descrição corretos
4. [ ] Testar em [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [ ] Card deve aparecer corretamente
5. [ ] Verificar robots.txt: `seu-dominio.com/robots.txt`
6. [ ] Verificar sitemap.xml: `seu-dominio.com/sitemap.xml`

### Monitoramento Inicial (SEMANA 1)

- [ ] Verificar Search Console diariamente
  - [ ] "Cobertura" - Ver erros de crawl
  - [ ] "Sitemaps" - Confirmar processamento
- [ ] Verificar Analytics
  - [ ] Usuários aparecem?
  - [ ] Eventos são rastreados?
- [ ] Testar formulário até o final

### Otimizações Adicionais (SEMANA 2+)

#### Content

- [ ] Revisar meta descriptions
- [ ] Criar 1-2 blog posts para keywords alvo
- [ ] Adicionar FAQ schema se tiver seção FAQ

#### Technical

- [ ] Implementar redirecionamentos 301 (se houver URLs antigas)
- [ ] Configurar Google Business Profile (se local)
- [ ] Adicionar SSL (Vercel faz automaticamente)

#### Link Building

- [ ] Adicionar seu site em diretórios locais
- [ ] Contatar sites relacionados
- [ ] Guest posts em blogs

---

## PROBLEMAS COMUNS PÓS-DEPLOY

### Problema: Google não encontra meu site

**Solução**:

1. Verificar se `robots.txt` permite (não deve ter `Disallow: /`)
2. Submeter sitemap em Search Console
3. Usar "URL Inspection" em Search Console
4. Aguardar até 2 semanas

### Problema: Meta tags não aparecem

**Solução**:

1. Verificar se variáveis de ambiente estão definidas
2. Verificar se `.env.local` não foi commitado (deve estar em `.gitignore`)
3. Fazer redeploy no Vercel
4. Limpar cache do navegador (Ctrl+Shift+Delete)

### Problema: Imagem OG não aparece no preview

**Solução**:

1. Verificar se arquivo `og-image.png` está em `/public/`
2. Verificar se arquivo tem exatamente 1200x630px
3. Testar URL da imagem diretamente
4. Usar Facebook Debugger para limpar cache: https://developers.facebook.com/tools/debug/

### Problema: Formulário não funciona no deploy

**Solução**:

1. Verificar console do navegador (F12 → Console)
2. Verificar Network tab para erros de request
3. Verificar variáveis de ambiente (Google Sheets API, etc)
4. Testar localStorage funciona (abrir DevTools → Application)

### Problema: Baixa performance

**Solução**:

1. Verificar Core Web Vitals em PageSpeed Insights
2. Otimizar imagens (converter para WebP/AVIF)
3. Verificar se há scripts bloqueadores
4. Usar Lighthouse para identificar gargalo

---

## CHECKLIST DE TESTES PÓS-DEPLOY

### Funcionalidade

- [ ] Home page carrega corretamente
- [ ] Click em "Iniciar diagnóstico" funciona
- [ ] Formulário multi-step funciona
- [ ] Submeter form vai para resultado
- [ ] Resultado mostra diagnóstico
- [ ] CTA (Calendly) funciona

### SEO

- [ ] View source contém `<title>`
- [ ] View source contém `og:title`
- [ ] View source contém `og:description`
- [ ] View source contém schema-org JSON
- [ ] Sitemap.xml acessível
- [ ] Robots.txt acessível
- [ ] Meta description visível em busca (após indexação)

### Performance

- [ ] Page Load: < 3 segundos
- [ ] Lighthouse Performance: > 90
- [ ] Mobile Performance: > 80
- [ ] Imagens carregam rapidamente
- [ ] Sem erros em Console

### Mobile

- [ ] Home responsiva
- [ ] Formulário funciona em mobile
- [ ] Resultado legível em mobile
- [ ] Buttons são tácteis (48x48px)
- [ ] Sem overflow horizontal

### Segurança

- [ ] HTTPS ativo (green lock)
- [ ] Sem warnings de certificado
- [ ] Security headers presentes
- [ ] Sem conteúdo misto (http + https)

---

## APÓS 1 MÊS

### Análise de Resultados

- [ ] Quantos usuários visitaram?
- [ ] Quantos iniciaram o diagnóstico?
- [ ] Taxa de conclusão do formulário?
- [ ] Quantos conversões (agendamentos)?
- [ ] De qual país/cidade vêm os usuários?
- [ ] Que palavras-chave trazem tráfego?

### Otimizações Baseadas em Dados

- [ ] Melhorar CTR se < 2% (revisar meta description)
- [ ] Aumentar conteúdo se tráfego < 50/mês
- [ ] Otimizar landing page (A/B testar headlines)
- [ ] Criar conteúdo para keywords com impressões

---

## CHECKLIST FINAL

```
Deploy ✅
SEO Implementado ✅
Google Search Console ✅
Google Analytics ✅
Sitemap Submetido ✅
Performance OK ✅
Mobile OK ✅
Funcionalidade OK ✅
READY FOR LAUNCH 🚀
```

---

**Boa sorte com seu lançamento!** 🎉
