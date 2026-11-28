import fs from 'node:fs';
import { Redis } from '@upstash/redis';
const start=process.argv[2], end=process.argv[3];
if(!/^\d{4}-\d{2}-\d{2}$/.test(start||'')||!/^\d{4}-\d{2}-\d{2}$/.test(end||''))throw new Error('Usage: node --env-file=.env.local scripts/report-growth.mjs YYYY-MM-DD YYYY-MM-DD');
const days=(Date.parse(end)-Date.parse(start))/86400000;
if(!Number.isInteger(days)||days<0||days>62)throw new Error('Choose a valid period of at most 63 days.');
const report={period:{start,end,timezone:'UTC'},intent_metrics:{status:'unknown'},business_outcomes:{status:'unknown'}};
const storeUrl=process.env.SITE_DATA_KV_REST_API_URL||process.env.KV_REST_API_URL;
const storeToken=process.env.SITE_DATA_KV_REST_API_READ_ONLY_TOKEN||process.env.SITE_DATA_KV_REST_API_TOKEN||process.env.KV_REST_API_TOKEN;
if(storeUrl&&storeToken){
 try{
 const redis=new Redis({url:storeUrl,token:storeToken});
 const startedAt=await redis.get('site-metrics:v1:startedAt');
 if(startedAt){
 const rows=await Promise.all(Array.from({length:days+1},(_,i)=>{const day=new Date(Date.parse(start)+i*86400000).toISOString().slice(0,10);return redis.hgetall(`site-metrics:v1:${day}`).then(counts=>({day,counts:counts||{}}));}));
 report.intent_metrics={status:'partial_or_complete_since_first_record',startedAt,fullPeriodAvailable:Date.parse(start)>=Date.parse(String(startedAt).slice(0,10)),rows,meaning:'Action counts, not unique people, delivered mail, meetings or offers.'};
 }
 }catch{report.intent_metrics={status:'unknown',reason:'Metrics store unavailable'};}
}
const ledger='.editorial/opportunities.json';
if(fs.existsSync(ledger)){
 const data=JSON.parse(fs.readFileSync(ledger));const rows=data.opportunities||[];const ids=new Set();const recorded={received:0,conversations_completed:0,offers_received:0};
 for(const row of rows){
 if(typeof row.id!=='string'||!row.id.trim()||ids.has(row.id))throw new Error('Opportunity IDs must be unique.');ids.add(row.id);
 if(!['hiring','consultation','partnership','speaking'].includes(row.kind))throw new Error('Unknown opportunity kind.');
 for(const [field,key]of[['receivedAt','received'],['conversationCompletedAt','conversations_completed'],['offerReceivedAt','offers_received']]){
 if(!row[field])continue;
 if(!Number.isFinite(Date.parse(row[field]))||typeof row.evidence?.[field]!=='string'||!row.evidence[field].trim())throw new Error('Each outcome requires a valid date and a private evidence reference.');
 if(row.kind==='hiring'&&row[field].slice(0,10)>=start&&row[field].slice(0,10)<=end)recorded[key]++;
 }
 }
 const complete=data.coverage?.confirmedComplete===true&&data.coverage.from<=start&&data.coverage.to>=end;
 report.business_outcomes={status:complete?'confirmed_period':'unknown',recorded_hiring_outcomes:recorded,note:complete?'Evidence-backed outcomes, deduplicated by opportunity.':'Recorded rows are not a complete historical baseline. Empty ledger does not establish zero outcomes.'};
}
console.log(JSON.stringify(report,null,2));
