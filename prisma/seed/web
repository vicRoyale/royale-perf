import { PrismaClient, Role, ActivityType, DealType, OfferStatus, MandateType } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const rounds = Number(process.env.PASSWORD_SALT_ROUNDS || 12)

  // Teams
  const teams = await prisma.team.createMany({ data: [
    { id: 'team-royal1', name: 'Équipe Royale Nord' },
    { id: 'team-royal2', name: 'Équipe Royale Sud' },
    { id: 'team-royal3', name: 'Équipe Prestige' },
  ], skipDuplicates: true })

  // Users (admin, managers, agents)
  const adminHash = await bcrypt.hash('Admin#2025', rounds)
  const managerHash = await bcrypt.hash('Manager#2025', rounds)
  const agentHash = await bcrypt.hash('Agent#2025', rounds)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@royale-transactions.fr' },
    update: {},
    create: {
      email: 'admin@royale-transactions.fr', hash: adminHash,
      role: Role.ADMIN, firstName: 'Victorin', lastName: 'DJIGAL',
    }
  })

  const managersData = [
    { email: 'manager.nord@royale.fr', firstName: 'Clara', lastName: 'Benoit', teamId: 'team-royal1' },
    { email: 'manager.sud@royale.fr', firstName: 'Hugo', lastName: 'Martel', teamId: 'team-royal2' },
    { email: 'manager.prestige@royale.fr', firstName: 'Salomé', lastName: 'Durand', teamId: 'team-royal3' },
  ]

  const managers = await Promise.all(managersData.map((m) => prisma.user.upsert({
    where: { email: m.email },
    update: {},
    create: { email: m.email, hash: managerHash, role: Role.MANAGER, firstName: m.firstName, lastName: m.lastName, teamId: m.teamId }
  })))

  await Promise.all(managers.map((m, i) => prisma.team.update({ where: { id: `team-royal${i+1}` }, data: { managerId: m.id } })))

  // 10 agents répartis
  const agentNames = [
    ['Lina', 'Morel'], ['Ethan','Rossi'], ['Camille','Leblanc'], ['Noah','Perez'], ['Inès','Robin'],
    ['Léo','Marchand'], ['Chloé','Lemaire'], ['Yanis','Lopez'], ['Zoé','Caron'], ['Adam','Roy']
  ]
  const teamIds = ['team-royal1','team-royal2','team-royal3']

  const agents = await Promise.all(agentNames.map((n, idx) => prisma.user.upsert({
    where: { email: `agent${idx+1}@royale.fr` },
    update: {},
    create: { email: `agent${idx+1}@royale.fr`, hash: agentHash, role: Role.AGENT, firstName: n[0], lastName: n[1], teamId: teamIds[idx % teamIds.length] }
  })))

  // Objectifs mensuels (courant)
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  await prisma.goal.create({ data: { scope: 'GLOBAL', period: startOfMonth, targetMandates: 30, targetExclusive: 15, targetRevenue: 180000, targetCalls: 2500, targetEstimations: 120, targetVisits: 220, targetDealsCompromis: 25, targetDealsActes: 20 } as any })

  // Génère 90 jours d’historique d’activités, leads, deals
  const cities = ['Orléans','Fleury-les-Aubrais','Saint-Jean-de-Braye','Saran','Olivet']
  const sources = ['Site web','Recommandation','Porte-à-porte','Réseaux sociaux','Annonce']

  const today = new Date()
  const start = new Date(today)
  start.setDate(start.getDate() - 90)

  for (let d = new Date(start); d <= today; d.setDate(d.getDate()+1)) {
    for (const a of agents) {
      const actions = Math.floor(Math.random()*8) + 3 // 3-10 actions
      for (let i = 0; i < actions; i++) {
        const typePool = [ActivityType.CALL, ActivityType.EMAIL, ActivityType.SMS, ActivityType.RELANCE, ActivityType.ESTIMATION, ActivityType.VISITE, ActivityType.DOORDOOR]
        const type = typePool[Math.floor(Math.random()*typePool.length)]
        await prisma.activity.create({ data: { type, date: new Date(d), agentId: a.id, duration: type===ActivityType.CALL ? 5+Math.floor(Math.random()*15) : null } })
      }

      // 20% jours => nouveaux leads
      if (Math.random() < 0.2) {
        const lead = await prisma.lead.create({ data: {
          source: sources[Math.floor(Math.random()*sources.length)],
          contact: `Prospect ${Math.floor(Math.random()*10000)}`,
          status: 'NOUVEAU',
          agentId: a.id,
          slaHours: Math.floor(Math.random()*24),
          firstReply: Math.random()<0.8 ? new Date(d.getTime()+Math.floor(Math.random()*4)*3600*1000) : null
        } })

        // 30% => estimation
        if (Math.random() < 0.3) {
          await prisma.activity.create({ data: { type: ActivityType.ESTIMATION, date: new Date(d), agentId: a.id, leadId: lead.id } })
          // 40% => mandat, 50% exclusif
          if (Math.random() < 0.4) {
            const property = await prisma.property.create({ data: {
              type: 'Maison', address: `${Math.floor(Math.random()*200)} rue Royale`, city: cities[Math.floor(Math.random()*cities.length)], postalCode: '45000', surface: 80+Math.floor(Math.random()*120), priceTarget: 150000+Math.floor(Math.random()*400000), agentId: a.id
            } })
            await prisma.mandate.create({ data: { type: Math.random()<0.5 ? MandateType.EXCLUSIF : MandateType.SIMPLE, propertyId: property.id, dateStart: new Date(d), priceAsk: property.priceTarget, agentId: a.id } })
            // 60% => visites
            if (Math.random() < 0.6) {
              const visits = 1+Math.floor(Math.random()*3)
              for (let v=0; v<visits; v++) {
                await prisma.visit.create({ data: { propertyId: property.id, leadId: lead.id, date: new Date(d.getTime()+v*3600*1000), result: 'OK', agentId: a.id } })
              }
              // 35% => offre
              if (Math.random() < 0.35) {
                const amount = property.priceTarget * (0.95 + Math.random()*0.1) // +/-5%
                const offer = await prisma.offer.create({ data: { amount, status: OfferStatus.EN_NEGO, date: new Date(d), agentId: a.id, propertyId: property.id, leadId: lead.id } })
                // 60% => acceptée -> compromis -> 70% acte plus tard
                if (Math.random() < 0.6) {
                  await prisma.offer.update({ where: { id: offer.id }, data: { status: OfferStatus.ACCEPTEE } })
                  const commission = amount * 0.03
                  const compDate = new Date(d.getTime()+3*24*3600*1000)
                  await prisma.deal.create({ data: { type: DealType.COMPROMIS, amount, commission, date: compDate, agentId: a.id, leadId: lead.id, propertyId: property.id } })
                  if (Math.random() < 0.7) {
                    const acteDate = new Date(compDate.getTime()+30*24*3600*1000)
                    await prisma.deal.create({ data: { type: DealType.ACTE, amount, commission, date: acteDate, agentId: a.id, leadId: lead.id, propertyId: property.id } })
                  }
                } else if (Math.random() < 0.5) {
                  await prisma.offer.update({ where: { id: offer.id }, data: { status: OfferStatus.REFUSEE } })
                }
              }
            }
          }
        }
      }
    }
  }

  console.log('Seed terminé.')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
