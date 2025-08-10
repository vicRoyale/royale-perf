import { prisma } from '@/src/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'

export async function GET(){
  const session = await getServerSession(authOptions)
  if (!session) return new Response('Unauthorized', { status: 401 })
  const userId = (session as any).user.id
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth()+1, 0)

  const [calls, estimates, mandates, offers, compromis, actes, revenue] = await Promise.all([
    prisma.activity.count({ where: { agentId: userId, type:'CALL', date: { gte: start, lte: end } } }),
    prisma.activity.count({ where: { agentId: userId, type:'ESTIMATION', date: { gte: start, lte: end } } }),
    prisma.mandate.count({ where: { agentId: userId, dateStart: { gte: start, lte: end } } }),
    prisma.offer.count({ where: { agentId: userId, date: { gte: start, lte: end } } }),
    prisma.deal.count({ where: { agentId: userId, type:'COMPROMIS', date: { gte: start, lte: end } } }),
    prisma.deal.count({ where: { agentId: userId, type:'ACTE', date: { gte: start, lte: end } } }),
    prisma.deal.aggregate({ _sum: { commission: true }, where: { agentId: userId, type:'ACTE', date: { gte: start, lte: end } } })
  ])

  return Response.json({ calls, estimates, mandates, offers, compromis, actes, revenue: revenue._sum.commission ?? 0 })
}
