'use client'
export function KPI({ label, value, format }:{ label:string; value:number; format?:'currency' }){
  const display = format==='currency' ? new Intl.NumberFormat('fr-FR', { style:'currency', currency:'EUR' }).format(value) : value.toString()
  return (
    <div className="bg-white rounded-2xl shadow p-4 border">
      <div className="text-sm text-royale.dark/70">{label}</div>
      <div className="text-2xl font-semibold text-royale.primary mt-1">{display}</div>
    </div>
  )
}
export default KPI
