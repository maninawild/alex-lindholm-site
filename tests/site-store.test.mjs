import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const js=ts.transpileModule(fs.readFileSync(new URL('../lib/site-store.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ES2022}}).outputText;
const {siteStoreCredentials}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
test('dedicated store never mixes new and old credentials',()=>{
 const keys=['SITE_DATA_KV_REST_API_URL','SITE_DATA_KV_REST_API_TOKEN','KV_REST_API_URL','KV_REST_API_TOKEN'];
 const previous=Object.fromEntries(keys.map(k=>[k,process.env[k]]));
 try {
  process.env.KV_REST_API_URL='https://legacy.invalid';process.env.KV_REST_API_TOKEN='legacy-fixture';
  process.env.SITE_DATA_KV_REST_API_URL='https://dedicated.invalid';process.env.SITE_DATA_KV_REST_API_TOKEN='dedicated-fixture';
  assert.deepEqual(siteStoreCredentials(),{url:'https://dedicated.invalid',token:'dedicated-fixture'});
  delete process.env.SITE_DATA_KV_REST_API_TOKEN;
  assert.deepEqual(siteStoreCredentials(),{url:'https://dedicated.invalid',token:undefined});
  delete process.env.SITE_DATA_KV_REST_API_URL;
  assert.deepEqual(siteStoreCredentials(),{url:'https://legacy.invalid',token:'legacy-fixture'});
 } finally {for(const k of keys)if(previous[k]===undefined)delete process.env[k];else process.env[k]=previous[k];}
});
