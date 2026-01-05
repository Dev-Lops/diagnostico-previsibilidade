# 🎨 Quick Reference - Classes Premium

## 🏗️ Componentes Principais

### Card Premium

```tsx
<div className='card-premium rounded-2xl p-8'>Conteúdo da card refinada</div>
```

### Botão Premium

```tsx
<button className='btn-premium rounded-full px-12 py-5 text-lg font-bold shadow-gold-glow hover:shadow-gold-lg'>
  Clique aqui
</button>
```

### Input Premium

```tsx
<input
  className='w-full px-4 py-3 rounded-xl border-2 border-amber-600/50 bg-gray-900/50 text-white'
  placeholder='Digite aqui'
/>
```

### Glass Morphism

```tsx
<div className='glass-premium px-6 py-3 rounded-full'>
  Conteúdo com efeito vidro
</div>
```

### Badge Gold

```tsx
<div className='badge-gold px-4 py-2 rounded-full inline-flex items-center gap-2'>
  <div className='w-2.5 h-2.5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full animate-pulse'></div>
  <span>Status Premium</span>
</div>
```

---

## 🎨 Cores & Gradientes

### Texto Ouro

```tsx
<span className="gold-text text-2xl font-bold">Texto Destaque</span>
<span className="text-amber-400">Ambar claro</span>
<span className="text-yellow-400">Amarelo brilhante</span>
```

### Backgrounds

```tsx
// Fundo preto
<div className="bg-black">Fundo preto puro</div>
<div className="bg-gray-950">Preto com tom</div>
<div className="bg-gray-900">Cinza muito escuro</div>

// Com transparência
<div className="bg-gray-900/50">50% transparente</div>
<div className="bg-amber-600/20">Ouro 20% opaco</div>
```

### Gradientes

```tsx
// Gradient de direita para esquerda
<div className="bg-gradient-to-r from-yellow-400 to-amber-500">
  Gradient ouro
</div>

// Gradient diagonal
<div className="bg-gradient-to-br from-amber-600/20 to-yellow-600/20">
  Gradient diagonal
</div>
```

---

## ✨ Sombras & Efeitos

### Shadows

```tsx
<div className="shadow-gold">Sombra leve dourada</div>
<div className="shadow-gold-lg">Sombra média dourada</div>
<div className="shadow-gold-glow">Sombra com glow</div>
```

### Hover Effects (automáticos)

```tsx
// Cards ganham border dourada ao hover
<div className="card-premium hover:border-amber-600">...</div>

// Botões ganham mais glow
<button className="btn-premium hover:shadow-gold-glow">...</button>
```

---

## 🎬 Animações

### Float

```tsx
<div className="animate-float">Flutua levemente</div>
<div className="animate-float delay-500">Com delay</div>
```

### Pulse

```tsx
<div className="animate-pulse">Pisca continuamente</div>
<div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse">
  Ponto pulsante
</div>
```

### Fade In

```tsx
<div className="animate-fade-in-up">Entra de baixo</div>
<div className="animate-fade-in-up delay-100">Com delay</div>
```

### Spin

```tsx
<div className="animate-spin">Gira continuamente</div>
<div className="animate-spin h-5 w-5">Spinner customizado</div>
```

---

## 📐 Borders & Radius

### Borders

```tsx
<div className="border border-amber-600/50">Borda dourada suave</div>
<div className="border-2 border-amber-600/50">Borda mais grossa</div>
<div className="border-t border-amber-600/30">Borda superior apenas</div>
```

### Border Radius

```tsx
<div className="rounded-lg">Leve curvatura</div>
<div className="rounded-xl">Média curvatura</div>
<div className="rounded-2xl">Forte curvatura</div>
<div className="rounded-full">Totalmente redondo</div>
```

---

## 📏 Spacing

### Padding

```tsx
<div className="p-4">Padding pequeno</div>
<div className="p-6">Padding médio</div>
<div className="p-8">Padding grande</div>
<div className="p-12 md:p-16">Responsivo</div>
```

### Gap (espaço entre itens)

```tsx
<div className="flex gap-2">Espaço pequeno</div>
<div className="flex gap-4">Espaço médio</div>
<div className="flex gap-6">Espaço grande</div>
<div className="grid gap-8">Grid com espaço</div>
```

---

## 🔤 Tipografia

### Cores de Texto

```tsx
<p className="text-white">Branco puro</p>
<p className="text-gray-300">Cinza claro</p>
<p className="text-gray-400">Cinza médio</p>
<p className="text-gray-500">Cinza escuro</p>
```

### Sizes

```tsx
<h1 className="text-6xl md:text-7xl font-bold">Título enorme</h1>
<h2 className="text-4xl md:text-5xl font-bold">Título grande</h2>
<h3 className="text-3xl font-bold">Título médio</h3>
<p className="text-lg">Parágrafo grande</p>
<p className="text-sm">Parágrafo pequeno</p>
```

### Weights

```tsx
<p className="font-normal">Regular 400</p>
<p className="font-semibold">Semibold 600</p>
<p className="font-bold">Bold 700</p>
<p className="font-black">Black 900</p>
```

### Letter Spacing

```tsx
<p className="tracking-wide">Espaço normal</p>
<p className="tracking-widest">Espaço largo</p>
<p className="tracking-tight">Espaço cerrado</p>
```

---

## 🎯 Componentes Complexos

### Hero Section

```tsx
<div className='min-h-screen bg-premium-dark relative overflow-hidden'>
  {/* Background gradient */}
  <div className='absolute inset-0 opacity-50'>
    <div className='absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-600/20 via-amber-700/10 to-transparent blur-3xl animate-float'></div>
  </div>

  {/* Content */}
  <div className='relative z-10'>
    <h1 className='text-6xl md:text-8xl font-bold text-white'>
      Seu <span className='gold-text'>título premium</span>
    </h1>
  </div>
</div>
```

### Feature Cards Grid

```tsx
<div className='grid md:grid-cols-3 gap-8'>
  {[1, 2, 3].map((item) => (
    <div key={item} className='card-premium rounded-2xl p-8 group hover-lift'>
      <div className='w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-gold'>
        <svg className='w-7 h-7 text-black' />
      </div>
      <h3 className='text-xl font-bold text-white mb-3'>Título</h3>
      <p className='text-gray-400 leading-relaxed'>Descrição</p>
    </div>
  ))}
</div>
```

### Form Section

```tsx
<div className='card-premium rounded-3xl p-8 space-y-6'>
  <label className='block text-sm font-semibold text-amber-400 mb-2 tracking-wide'>
    LABEL PREMIUM
  </label>
  <input
    className='w-full px-4 py-3 rounded-xl border-2 border-amber-600/50 bg-gray-900/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition'
    placeholder='Digite aqui'
  />
</div>
```

### CTA Button Section

```tsx
<div className='relative card-premium-dark rounded-3xl p-12 md:p-16 overflow-hidden'>
  <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-500/15 via-amber-600/15 to-transparent blur-3xl'></div>
  <div className='relative z-10 text-center'>
    <h2 className='text-3xl md:text-5xl font-bold text-white mb-4'>
      Título <span className='gold-text'>Premium</span>
    </h2>
    <button className='btn-premium rounded-full px-10 py-5 text-lg font-semibold shadow-gold-lg hover:shadow-gold-glow'>
      CTA Principal
    </button>
  </div>
</div>
```

---

## 📱 Responsividade

### Breakpoints

```tsx
<div className="text-4xl md:text-5xl lg:text-6xl">
  Texto que cresce com a tela
</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* 1 coluna mobile, 2 tablet, 3 desktop */}
</div>
```

### Display/Hide

```tsx
<div className="hidden md:block">Visível apenas em desktop</div>
<div className="md:hidden">Visível apenas mobile</div>
```

---

## 🎨 Paleta Completa

```
OURO:
  #8b6f47  dark-gold
  #d4af37  gold-medium (principal)
  #f4d03f  gold-light (destaques)
  #cda55d  gold-accent

PRETO:
  #0a0a0a  black-primary (fundo)
  #141414  black-secondary (layers)
  #1a1a1a  black-tertiary (cards)

BRANCO:
  #ffffff  white-primary
  #f5f5f5  white-secondary
  #e8e8e8  white-tertiary
```

---

## 💡 Dicas Práticas

### 1. Card com Hover Sofisticado

```tsx
<div className='card-premium rounded-2xl p-8 group hover-lift hover:border-amber-600'>
  <h3 className='text-white group-hover:text-amber-300 transition-colors'>
    Hover me!
  </h3>
</div>
```

### 2. Texto com Gradient Animado

```tsx
<span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 animate-goldShimmer'>
  Texto brilhante
</span>
```

### 3. Button com Glow Duplo

```tsx
<button className='btn-premium shadow-gold-glow hover:shadow-gold-lg hover:-translate-y-1 transition-all'>
  Sobe ao hover
</button>
```

### 4. Container Premium

```tsx
<div className='min-h-screen bg-premium-dark flex items-center justify-center'>
  <div className='max-w-5xl w-full card-premium rounded-3xl p-12'>
    Conteúdo centralizado premium
  </div>
</div>
```

---

## 🚀 Pronto para Usar!

Copie e cole qualquer um desses exemplos no seu código React para ter componentes premium instantaneamente.

Para mais detalhes, consulte `globals.css` ou `REDESIGN-PREMIUM.md`.
