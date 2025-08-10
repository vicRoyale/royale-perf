export function subscribeKpis(onMessage:(e:any)=>void){
  const es = new EventSource('/api/sse/stream')
  es.onmessage = (ev) => { try { onMessage(JSON.parse(ev.data)) } catch {}
  }
  return () => es.close()
}
