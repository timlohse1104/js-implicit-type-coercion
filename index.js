import * as fs from 'fs';
import * as childProcess from 'child_process';

// Allowed characters: ({[/>+!-=\]})
// JS base types: Strings, Numbers, Booleans, Arrays, Objects
// Merge base types -> Type Coercion

const numbers = {};
const alphabet = {};

numbers['0'] = '+[]';
numbers['1'] = '+!![]';

const genNumber = (number) => {
  if (number === 0) return numbers['0'];
  return Array.from({ length: number }, () => numbers['1']).join(' + ');
};

const genString = (string) =>
  Array.from(string, (char) => {
    if (!(char in alphabet)) {
      const charCode = char.charCodeAt(0);
      return `([]+[])[${genString('constructor')}][${genString('fromCharCode')}](${genNumber(charCode)})`;
    }
    return alphabet[char];
  }).join('+');

// SETUP: create alphabet
alphabet['a'] = `(!{} + [])[${genNumber(1)}]`;
alphabet['b'] = `({} + [])[${genNumber(2)}]`;
alphabet['o'] = `({} + [])[${genNumber(1)}]`;
alphabet['e'] = `(!{} + [])[${genNumber(4)}]`;
alphabet['c'] = `({} + [])[${genNumber(5)}]`;
alphabet['t'] = `(!!{} + [])[${genNumber(0)}]`;
alphabet[' '] = `({} + [])[${genNumber(7)}]`;
alphabet['f'] = `(!{} + [])[${genNumber(0)}]`;
alphabet['s'] = `(!{} + [])[${genNumber(3)}]`;
alphabet['r'] = `(!!{} + [])[${genNumber(1)}]`;
alphabet['u'] = `(!!{} + [])[${genNumber(2)}]`;
alphabet['i'] = `(+!![] / +[] + [])[${genNumber(3)}]`;
alphabet['n'] = `(+!![] / +[] + [])[${genNumber(1)}]`;
alphabet['S'] = `([] + ([] + [])[${genString('constructor')}])[${genNumber(9)}]`;
alphabet['g'] = `([] + ([] + [])[${genString('constructor')}])[${genNumber(14)}]`;
alphabet['p'] = `([] + (/-/)[${genString('constructor')}])[${genNumber(14)}]`;
alphabet['\\'] = `(/\\\\/+[])[${genNumber(1)}]`;
alphabet['d'] = `([] + ([] + [])[${genString('constructor')}])[${genNumber(30)}]`;
alphabet['h'] = `(${genNumber(17)})[${genString('toString')}](${genNumber(18)})`;
alphabet['m'] = `(${genNumber(22)})[${genString('toString')}](${genNumber(24)})`;
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/escape
alphabet['C'] = `((()=>{})[${genString('constructor')}](${genString('return escape')})()(${alphabet['\\']}))[${genNumber(2)}]`;

const compile = (code) => `(()=>{})[${genString('constructor')}](${genString(code)})()`;

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
test 53: ([] + ([] + [])[${genString("constructor")}])[${genNumber(9)}]
test 54: ([] + ([] + [])[${genString("constructor")}])[${genNumber(14)}]
test 55: ([] + ([] + [])[${genString("constructor")}])[${genNumber(25)}]
test 56: ${Object.getOwnPropertyNames(Object)}
test 57: ([]+(/-/)[${genString('constructor')}])
test 58: ${"a".toUpperCase()}
test 59: ${(() => {})["constructor"]}
test 60: ${eval(((()=>{})['constructor']('return escape')()(alphabet["\\"]))[2])}
test 61: ${alphabet["\\"]}
test 62: ${alphabet.C}
test 63: ${eval(alphabet.C)}
test 64: ${'D'.charCodeAt(0)}
test 65: ${eval(genNumber('D'.charCodeAt(0)))}
test 66: ${String.fromCharCode(eval(genNumber('D'.charCodeAt(0))))}
test 67: ${([]+[])['constructor']}
test 68: ${([]+[])['constructor']['fromCharCode'](eval(genNumber('D'.charCodeAt(0))))}
test 69: ${(10).toString(2)}
test 70: ${(13).toString(18)}
`);

console.log(alphabet);
console.log(numbers);

// OUTPUT: generate encrypted code
const output = `${compile('console.log("Lauri mein Schatz, ich liebe dich!");')}`;
fs.writeFileSync('dist/output.js', output);
const outputResponse = childProcess.execSync('node dist/output.js').toString();

console.log(`
| Content - 'output.js'     :
|----------------------------
| ${output}
|
| Executed - 'node output.js:
|----------------------------
| ${outputResponse}
`);
