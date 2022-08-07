import * as fs from 'fs';
import * as childProcess from 'child_process';
import { TypeCoercionCompiler } from './tc-compiler/compiler.js';

const compiler = new TypeCoercionCompiler();

// DEBUG
// prettier-ignore
console.log(`
test 1: ${"2" + -[]}
test 2: ${!{}}
test 3: ${!!{}}
test 4: ${+[]}
test 5: ${-[]}
test 6: ${+{}}
test 7: ${-{}}
test 8: ${{} + []}
test 9: ${+!!{}}
test 10: ${+!![] / +[]}
test 11: ${+"a"}
test 12: ${("b" + "a" + +"a" + "a").toLowerCase()}
test 13: ${(+"a" + "o").toLowerCase()}
test 14: ${(!{} + [])[0]}
test 15: ${(!{} + [])[1]}
test 16: ${(!{} + [])[2]}
test 17: ${(!{} + [])[3]}
test 18: ${(!{} + [])[4]}
test 19: ${(!!{} + [])[0]}
test 20: ${(!!{} + [])[1]}
test 21: ${(!!{} + [])[2]}
test 22: ${(!!{} + [])[3]}
test 23: ${(+{} + [])[0]}
test 24: ${({} + [])[0]}
test 25: ${({} + [])[1]}
test 26: ${({} + [])[2]}
test 27: ${({} + [])[3]}
test 28: ${({} + [])[4]}
test 29: ${({} + [])[5]}
test 30: ${({} + [])[6]}
test 31: ${({} + [])[7]}
test 32: ${({} + [])[8]}
test 33: ${({} + [])[9]}
test 34: ${({} + [])[10]}
test 35: ${({} + [])[11]}
test 36: ${({} + [])[12]}
test 37: ${({} + [])[13]}
test 38: ${({} + [])[14]}
test 39: ${(+!![] / +[] + [])[0]}
test 40: ${(+!![] / +[] + [])[1]}
test 41: ${(+!![] / +[] + [])[2]}
test 42: ${(+!![] / +[] + [])[3]}
test 43: ${(+!![] / +[] + [])[4]}
test 44: ${(+!![] / +[] + [])[5]}
test 45: ${(+!![] / +[] + [])[6]}
test 46: ${(+!![] / +[] + [])[7]}
test 47: ${{}["constructor"]}
test 48: ${[]["constructor"]}
test 49: ${(+![])["constructor"]}
test 50: ${([] + [])["constructor"]}
test 51: ${(!![])["constructor"]}
test 52: ${{}["toString"]}
test 53: ([] + ([] + [])[${compiler.genString("constructor")}])[${compiler.genNumber(9)}]
test 54: ([] + ([] + [])[${compiler.genString("constructor")}])[${compiler.genNumber(14)}]
test 55: ([] + ([] + [])[${compiler.genString("constructor")}])[${compiler.genNumber(25)}]
test 56: ${Object.getOwnPropertyNames(Object)}
test 57: ([]+(/-/)[${compiler.genString('constructor')}])
test 58: ${"a".toUpperCase()}
test 59: ${(() => {})["constructor"]}
test 60: ${eval(((()=>{})['constructor']('return escape')()(compiler.alphabet["\\"]))[2])}
test 61: ${compiler.alphabet["\\"]}
test 62: ${compiler.alphabet.C}
test 63: ${eval(compiler.alphabet.C)}
test 64: ${'D'.charCodeAt(0)}
test 65: ${eval(compiler.genNumber('D'.charCodeAt(0)))}
test 66: ${String.fromCharCode(eval(compiler.genNumber('D'.charCodeAt(0))))}
test 67: ${([]+[])['constructor']}
test 68: ${([]+[])['constructor']['fromCharCode'](eval(compiler.genNumber('D'.charCodeAt(0))))}
test 69: ${(10).toString(2)}
test 70: ${(13).toString(18)}
`);

// OUTPUT-TEST: generate compiled test message
const messageOutput = `${compiler.compile('console.log("This js type coercion rocks!");')}`;
fs.writeFileSync('dist/messageOutput.js', messageOutput);
const messageOutputResponse = childProcess.execSync('node dist/messageOutput.js').toString();

console.log(`
| Executed - 'node dist/messageOutput.js:
|----------------------------
| ${messageOutputResponse}
`);

// OUTPUT-TEST: generate compiled code message of js typecoercion compiler
const compilerOutput = `${compiler.compile('const zero = "+[]";const one = "+!![]";const num = n => {if(n === 0){return zero};return Array.from({length: n}, () => one).join(" + ")};map = {};const str = s => {return Array.from(s, (c) => {if (!(c in map)) {const cc = c.charCodeAt(0);return `([]+[])[${str("constructor")}][${str("fromCharCode")}](${num(cc)})`;}return map[c];}).join("+");};map.a = `(!{} + [])[${num(1)}]`;map.b = `({} + [])[${num(2)}]`;map.o = `({} + [])[${num(1)}]`;map.e = `(!{} + [])[${num(4)}]`;map.c = `({} + [])[${num(5)}]`;map.t = `(!!{} + [])[${num(0)}]`;map[" "] = `({} + [])[${num(7)}]`;map.f = `(!{} + [])[${num(0)}]`;map.s = `(!{} + [])[${num(3)}]`;map.r = `(!!{} + [])[${num(1)}]`;map.u = `(!!{} + [])[${num(2)}]`;map.i = `(+!![] / +[] + [])[${num(3)}]`;map.n = `(+!![] / +[] + [])[${num(1)}]`;map.S = `([] + ([] + [])[${str("constructor")}])[${num(9)}]`;map.g = `([] + ([] + [])[${str("constructor")}])[${num(14)}]`;map.p = `([] + (/-/)[${str("constructor")}])[${num(14)}]`;map["\\\\"] = `(/\\\\\\\\/+[])[${num(1)}]`;map.d = `([] + ([] + [])[${str("constructor")}])[${num(30)}]`;map.h = `(${num(17)})[${str("toString")}](${num(18)})`;map.m = `(${num(22)})[${str("toString")}](${num(24)})`;map.C = `((()=>{})[${str("constructor")}](${str("return escape")})()(${map["\\\\"]}))[${num(2)}]`;console.log(`Null: ${zero}; Eins: ${one}; Zwei: ${num(2)}; constructor: ${str("constructor")}`);const compile = code => `(()=>{})[${str("constructor")}](${str(code)})()`;console.log("---");console.log(compile(`console.log("Nested compiled js type coercion rocks!");`));console.log("---");')}`
fs.writeFileSync('dist/compilerOutput.js', compilerOutput);
const compilerOutputResponse = childProcess.execSync('node dist/compilerOutput.js').toString();

console.log(`
| Executed - 'node dist/compilerOutput.js:
|----------------------------
| ${compilerOutputResponse}
`);
