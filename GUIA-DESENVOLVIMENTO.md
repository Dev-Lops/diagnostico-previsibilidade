# 📖 Guia de Desenvolvimento - Tema Premium

## Como Continuar o Desenvolvimento

### Estrutura do Tema

Todo o tema está centralizado em `/app/globals.css`. As variáveis CSS estão no `:root`:

```css
:root {
  /* Cores Ouro */
  --gold-dark: #8b6f47;
  --gold-medium: #d4af37;
  --gold-light: #f4d03f;
  --gold-accent: #cda55d;

  /* Cores Preto & Branco */
  --black-primary: #0a0a0a;
  --black-secondary: #141414;
  --white-primary: #ffffff;
}
```

### Adicionar Novos Componentes com Tema Premium

#### 1. Card Nova

```tsx
<div className='card-premium rounded-2xl p-8'>
  <h3 className='text-white font-bold text-xl'>Título</h3>
  <p className='text-gray-300'>Descrição</p>
</div>
```

#### 2. Botão com Glow

```tsx
<button className='btn-premium rounded-full px-8 py-3 shadow-gold-glow hover:shadow-gold-lg'>
  Ação
</button>
```

#### 3. Texto com Gradient Ouro

```tsx
<span className='gold-text text-2xl font-bold'>Destaque</span>
```

#### 4. Input Refinado

```tsx
<input
  className='input-premium w-full px-4 py-3 rounded-xl border-2'
  placeholder='Digite aqui'
  type='text'
/>
```

#### 5. Badge Premium

```tsx
<div className='badge-gold px-4 py-2 rounded-full inline-flex items-center gap-2'>
  <div className='w-2 h-2 bg-amber-400 rounded-full animate-pulse'></div>
  <span>Status Premium</span>
</div>
```

---

## Cores Tailwind Disponíveis

O projeto usa Tailwind v4 com classes de utilidade. As cores premium estão disponíveis:

### Ouro

- `text-amber-300`, `text-amber-400`, `text-yellow-400`
- `bg-amber-600/20`, `bg-yellow-500/10`
- `border-amber-600`, `border-yellow-400`

### Preto

- `bg-black`, `bg-gray-950`, `bg-gray-900`
- `text-white`, `text-gray-100`, `text-gray-300`

### Gradientes

```tsx
// Usado em componentes
className = 'bg-gradient-to-r from-yellow-400 to-amber-500'
className = 'bg-gradient-to-br from-amber-600/20 to-yellow-600/20'
```

---

## Animações Premium

### Glow Dourado

```tsx
<div className='animate-[goldGlow_2s_ease-in-out_infinite]'>
  Elemento com glow
</div>
```

### Fade In Up

```tsx
<div className='animate-fade-in-up'>Entra com animação suave</div>
```

### Float

```tsx
<div className='animate-float'>Flutua levemente</div>
```

---

## Mudanças Futuras Recomendadas

### 1. Adicionar Mais Animações

```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### 2. Criar Componentes React Reutilizáveis

```tsx
// components/PremiumCard.tsx
export function PremiumCard({ children, ...props }) {
  return (
    <div className='card-premium rounded-2xl p-8' {...props}>
      {children}
    </div>
  )
}
```

### 3. Adicionar Modo Escuro/Claro (Opcional)

```css
@media (prefers-color-scheme: light) {
  :root {
    --background: #fafaf8;
    --foreground: #0a0a0a;
  }
}
```

### 4. Expandir Paleta de Cores

```css
:root {
  /* Adicionar variantes adicionais */
  --gold-lightest: #fef3c7;
  --gold-darkest: #5a4a2a;
  /* ... mais cores conforme necessário */
}
```

---

## Performance & Otimização

### Classes CSS Utilizadas

- ✅ Todas as classes são utilitárias (Tailwind)
- ✅ Sem CSS-in-JS (melhor performance)
- ✅ Build tree-shaking automático

### Bundle Size

O projeto foi compilado com sucesso. Tamanho esperado:

- CSS: ~50-70KB (comprimido)
- JS: ~150-200KB (bundle principal)

### Recomendações

1. Usar `next/Image` para imagens
2. Lazy load componentes pesados
3. Prefetch links importantes
4. Use `<Suspense>` para conteúdo dinâmico

---

## Estrutura de Arquivos Relevantes

```
app/
├── globals.css           ← Tema premium aqui
├── page.tsx              ← Home
├── diagnostico/page.tsx  ← Formulário
├── resultado/page.tsx    ← Resultados
└── api/
    ├── diagnostic/route.ts
    └── save-lead/route.ts

lib/
├── types.ts
├── calculator.ts
└── analytics.ts
```

---

## Checklist para Manutenção

- [ ] Testar em desktop (Chrome, Firefox, Safari)
- [ ] Testar em mobile (iPhone, Android)
- [ ] Verificar contraste de cores (WCAG)
- [ ] Validar velocidade de carregamento
- [ ] Testar todas as animações
- [ ] Verificar links e CTAs
- [ ] Testar formulários
- [ ] Garantir responsive design

---

## Suporte Técnico

### Problemas Comuns

#### Cores não aparecem

- Verifique se as classes Tailwind estão corretas
- Confirme que o arquivo `globals.css` foi importado
- Limpe cache: `npm run build`

#### Animações lentas

- Reduza a duração: `animate-float` → `animate-float delay-300`
- Use `will-change` para elementos animados

#### Layout quebrado no mobile

- Verifique classes `md:`, `sm:`
- Use `responsive` classes do Tailwind

---

## Documentação Externa

- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Glass Morphism Best Practices](https://www.uxdesigninstitute.com/)

---

## Contato & Dúvidas

Para dúvidas sobre o tema premium ou implementação:

1. Consulte `REDESIGN-PREMIUM.md`
2. Verifique `globals.css` para referência de classes
3. Procure exemplos nas páginas (home, diagnostico, resultado)

---

## Versão

- **Data**: 2025
- **Tema**: Premium Preto & Dourado
- **Status**: ✅ Implementado e Testado
- **Compatibilidade**: Next.js 16+, Tailwind v4, React 19
