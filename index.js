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

// OUTPUT-TEST: generate encrypted code message
const messageOutput = `${compiler.compile('console.log("Lauri mein Schatz, ich liebe dich!");')}`;
fs.writeFileSync('dist/messageOutput.js', messageOutput);
const messageOutputResponse = childProcess.execSync('node dist/messageOutput.js').toString();

console.log(`
| Content - 'output.js'     :
|----------------------------
| ${messageOutput}
|
| Executed - 'node output.js:
|----------------------------
| ${messageOutputResponse}
`);

// OUTPUT-TEST: generate encrypted code message typecoercion compiler
const compilerOutput = `${compiler.compile('// Allowed characters: ({[/>+!-=]})')}
${compiler.compile('// JS base types: Strings, Numbers, Booleans, Arrays, Objects')}
${compiler.compile('// Merge base types -> Type Coercion')}`;
fs.writeFileSync('dist/compilerOutput.js', messageOutput);
