import {test} from 'node:test';import assert from 'node:assert/strict';import{calculateWages}from'../server/dist/wages.js';
test('example wages use paise and give a ₹700 balance',()=>{assert.deepEqual(calculateWages({workDays:6,dailyWage:700,advanceAmount:2000,payments:1500}),{gross:420000,advance:200000,payments:150000,balance:70000});});
test('partial payments reduce the remaining amount',()=>{assert.equal(calculateWages({workDays:2,dailyWage:800,advanceAmount:200,payments:500}).balance,90000);});
test('zero day and zero amount records remain zero',()=>{assert.equal(calculateWages({workDays:0,dailyWage:0}).balance,0);});
test('overtime adds its verified amount to gross wages',()=>{assert.equal(calculateWages({workDays:1,dailyWage:500,overtimeHours:2,overtimeRate:100}).gross,70000);});
test('negative, non-finite and fractional working days are rejected',()=>{assert.throws(()=>calculateWages({workDays:1,dailyWage:-1}));assert.throws(()=>calculateWages({workDays:1.5,dailyWage:100}));assert.throws(()=>calculateWages({workDays:1,dailyWage:Infinity}));});
