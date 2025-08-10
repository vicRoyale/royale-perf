import { prisma } from '@/src/lib/prisma'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function GET(){
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth()+1, 0)
  const revenue = await prisma.deal.aggregate({ _sum: { commission: true }, where: { type:'ACTE', date: { gte: start, lte: end } } })
  const pdf = await PDFDocument.create()
  const page = pdf.addPage([595, 842]) // A4
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  page.drawRectangle({ x:0, y:790, width:595, height:52, color: rgb(0.047,0.118,0.357) })
  page.drawText('Royale Transactions – Rapport mensuel', { x:24, y:810, size:16, color: rgb(1,1,1), font })
  page.drawText(`Commission totale (mois) : ${Math.round(revenue._sum.commission || 0)} €`, { x:24, y:760, size:14, font })
  const bytes = await pdf.save()
  return new Response(bytes, { headers: { 'Content-Type':'application/pdf', 'Content-Disposition':'inline; filename="rapport-mensuel.pdf"' } })
}
