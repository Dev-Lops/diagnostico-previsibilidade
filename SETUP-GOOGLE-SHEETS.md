# 📊 Configuração do Google Sheets para Captura de Leads

## Passo 1: Criar a Planilha do Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha chamada "Leads Diagnóstico Previsibilidade"
3. Na primeira linha (cabeçalhos), adicione estas colunas:

```
A1: Data/Hora
B1: Nome
C1: Email
D1: WhatsApp
E1: Faturamento Mensal
F1: Ticket Médio
G1: Canal Principal
H1: Investimento Marketing
I1: Taxa Conversão
J1: Capacidade Atendimento
K1: Clientes Atuais
L1: Potencial de Receita
M1: Gap de Receita
N1: Status
```

## Passo 2: Criar o Google Apps Script

1. Na planilha, clique em **Extensões** → **Apps Script**
2. Delete o código padrão e cole este código:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    const data = JSON.parse(e.postData.contents)

    // Adiciona nova linha com os dados
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.whatsapp,
      data.revenue,
      data.ticket,
      data.mainAcquisition,
      data.marketingInvestment,
      data.conversionRate,
      data.serviceCapacity,
      data.currentClients,
      data.potentialRevenue,
      data.revenueGap,
      data.status,
    ])

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: 'Dados salvos com sucesso',
      })
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON)
  }
}
```

3. Clique em **Salvar** (ícone de disquete)
4. Clique em **Implantar** → **Nova implantação**
5. Em "Tipo", selecione **Aplicativo da Web**
6. Configure:
   - **Descrição**: "API para salvar leads"
   - **Executar como**: "Eu (seu email)"
   - **Quem tem acesso**: "Qualquer pessoa"
7. Clique em **Implantar**
8. **Copie a URL do aplicativo da Web** (algo como: `https://script.google.com/macros/s/...../exec`)
9. Clique em **Concluído**

## Passo 3: Configurar a URL no Projeto Next.js

1. Crie um arquivo `.env.local` na raiz do projeto (se não existir)
2. Adicione esta linha com a URL que você copiou:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID_AQUI/exec
```

3. Reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Passo 4: Testar

1. Acesse sua aplicação
2. Preencha o formulário de diagnóstico
3. Após finalizar, verifique se uma nova linha apareceu na planilha

## 📋 O que é salvo automaticamente:

- ✅ Data e hora do preenchimento
- ✅ Nome, email e WhatsApp do lead
- ✅ Dados do negócio (faturamento, ticket médio, etc.)
- ✅ Resultados do diagnóstico
- ✅ Status do lead (para você acompanhar)

## 🎯 Como usar os dados:

### Para análise posterior:

- Filtre por "Status" para ver quais leads já foram contatados
- Ordene por "Gap de Receita" para priorizar leads com maior potencial
- Exporte para Excel quando precisar

### Para follow-up:

- Use os dados de contato (email/WhatsApp) para fazer follow-up
- Consulte o diagnóstico antes de reuniões
- Personalize sua abordagem baseado no perfil do negócio

## 🔒 Segurança:

- A URL do Google Script é privada, não compartilhe
- Apenas você tem acesso à planilha
- Os dados não ficam expostos publicamente
- Se vazar a URL, basta criar uma nova implantação

## 💡 Dica Pro:

Adicione uma coluna "O1: Observações" para anotar informações importantes sobre cada lead após reuniões ou conversas.

## 🆘 Problemas comuns:

**Erro 401/403**: Verifique se configurou "Quem tem acesso" como "Qualquer pessoa"

**Não está salvando**:

1. Verifique se a URL no `.env.local` está correta
2. Certifique-se de reiniciar o servidor após adicionar a variável
3. Abra o console do navegador (F12) para ver erros

**Formato incorreto na planilha**: Verifique se os cabeçalhos estão exatamente como no Passo 1
