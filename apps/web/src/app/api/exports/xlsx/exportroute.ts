import ExcelJS from 'exceljs'
import { prisma } from '@/src/lib/prisma'

export async function POST(req: Request){
  const { entity, filters } = await req.json()
  const rows = await prisma[entity as 'activity'].findMany({ where: filters || {}, take: 5000 } as any)
  const wb = new ExcelJS.Workbook(); const ws = wb.addWorksheet('Export')
  if (rows.length){ ws.columns = Object.keys(rows[0]).map(k => ({ header: k, key: k })); rows.forEach(r => ws.addRow(r)) }
  const buf = await wb.xlsx.writeBuffer()
  return new Response(Buffer.from(buf), { headers: { 'Content-Type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition':'attachment; filename="export.xlsx"' } })
