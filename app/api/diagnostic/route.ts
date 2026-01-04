import { calculate } from '@/lib/calculator'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const result = calculate(data)
    return Response.json(result)
  } catch {
    return Response.json(
      { error: 'Erro ao processar diagnóstico' },
      { status: 400 }
    )
  }
}
