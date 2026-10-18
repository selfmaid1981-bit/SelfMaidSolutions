import {test} from 'node:test';import assert from 'node:assert/strict';
import {normalize,intake,ownerGateway} from '../server/trio-gateway.mjs';
test('keeps actual service and explicit consent, never guesses cleaner routing',()=>{
 const data=normalize({name:'Synthetic Test',email:'TEST@example.invalid',projectType:'cinematic_logo'},'playhard_contact');
 assert.equal(data.service.type,'unclassified');assert.equal(data.consent.contactAllowed,false);assert.equal(data.details.projectType,'cinematic_logo');
 assert.equal(normalize({firstName:'Test',lastName:'User',phone:'3345550100',contactAllowed:true,serviceType:'deep_clean'},'contact').consent.contactAllowed,true);
 assert.throws(()=>normalize({name:'Test'},'contact'));
});
test('owner data rejects unauthenticated access',async()=>{
 let status,body;const res={setHeader(){},status(v){status=v;return this;},json(v){body=v;}};
 await ownerGateway({headers:{},query:{action:'leads'},method:'GET'},res);assert.equal(status,401);assert.equal(body.error,'Owner access required');
});
test('does not report success when the shared pipeline is unconfigured',async()=>{
 delete process.env.TRIO_HUB_URL;delete process.env.TRIO_HUB_KEY;
 let status;const res={setHeader(){},status(v){status=v;return this;},json(){}};
 await intake('contact')({method:'POST',headers:{},body:{name:'Synthetic Test',email:'test@example.invalid'}},res);assert.equal(status,503);
});
