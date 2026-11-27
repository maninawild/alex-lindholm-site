import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('../lib/metrics/contract.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2020}}).outputText;
const {parseMetric,metricPage}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
test('private routes in both languages never produce metrics',()=>{for(const path of ['/private','/private/ideas/x','/ru/private','/ru/private/jewish','/api/contact'])assert.equal(metricPage(path),null);});
test('both hiring locale routes map to the same bounded category',()=>{assert.equal(metricPage('/product-venture-leader'),'hiring');assert.equal(metricPage('/ru/product-venture-leader'),'hiring');assert.equal(metricPage('/articles/published-title'),'other-public');});
test('PII and arbitrary dimensions are rejected rather than stored',()=>{const base={event:'hiring_contact_click',page:'hiring',placement:'content'};assert.deepEqual(parseMetric(base),base);for(const field of ['email','name','message','url','ip'])assert.equal(parseMetric({...base,[field]:'anything'}),null);assert.equal(parseMetric({...base,event:'contact_provider_accepted'}),null);assert.equal(parseMetric({...base,page:'/private'}),null);});

import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const reporter=new URL('../scripts/report-growth.mjs',import.meta.url).pathname;
function businessReport(data){
 const cwd=fs.mkdtempSync(path.join(os.tmpdir(),'alex-ledger-test-'));
 try{
 fs.mkdirSync(path.join(cwd,'.editorial'));fs.writeFileSync(path.join(cwd,'.editorial/opportunities.json'),JSON.stringify(data));
 return JSON.parse(execFileSync(process.execPath,[reporter,'2026-11-01','2026-11-27'],{cwd,env:{...process.env,KV_REST_API_URL:'',KV_REST_API_TOKEN:''},stdio:['ignore','pipe','pipe']}).toString());
 }finally{fs.rmSync(cwd,{recursive:true,force:true});}
}
test('empty or partial ledger remains unknown, not a zero historical baseline',()=>{assert.equal(businessReport({coverage:{confirmedComplete:false},opportunities:[]}).business_outcomes.status,'unknown');});
test('an offer requires dated evidence and cannot be counted twice',()=>{
 const row={id:'fixture-1',kind:'hiring',offerReceivedAt:'2026-11-20',evidence:{offerReceivedAt:'fixture-only'}};
 const coverage={confirmedComplete:true,from:'2026-11-01',to:'2026-11-27'};
 assert.equal(businessReport({coverage,opportunities:[row]}).business_outcomes.recorded_hiring_outcomes.offers_received,1);
 assert.throws(()=>businessReport({coverage,opportunities:[row,row]}));
 assert.throws(()=>businessReport({coverage,opportunities:[{...row,evidence:{}}]}));
});
