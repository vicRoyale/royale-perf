import { Parser } from 'json2csv'
import { prisma } from '@/src/lib/prisma'

export async function POST(req: Request){
  const { entity, filters } = await req.json()
  // Exemple: entity='activities'
  const rows = await prisma.activity.findMany({ where: filters || {}, take: 5000 })
  const parser = new Parser()
  const csv = parser.parse(rows)
  return new Response(csv, { headers: { 'Content-Type':'text/csv', 'Content-Disposition':'attachment; filename="export.csv"' } })
}
