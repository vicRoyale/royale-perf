'use client'
import { useEffect, useState } from 'react'
import { subscribeKpis } from '@/src/lib/sse'
import { KPI, Card } from 'ui'

export default function DashboardKpis({ initial }:{ initial: any }){
  const [kpi, setKpi] = useState(initial)
  useEffect(()=>{ return subscribeKpis(()=>{ // à chaque évènement, refetch minimal
    fetch('/api/exports/kpi?scope=me').then(r=>r.json()).then(setKpi)
  }) },[])
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <KPI label="Appels" value={kpi.calls} />
      <KPI label="Estimations" value={kpi.estimates} />
      <KPI label="Mandats" value={kpi.mandates} />
      <KPI label="Offres" value={kpi.offers} />
      <KPI label="Compromis" value={kpi.compromis} />
      <KPI label="Actes" value={kpi.actes} />
      <KPI label="Commission (€)" value={Math.round(kpi.revenue)} format="currency" />
    </div>
  )
}
