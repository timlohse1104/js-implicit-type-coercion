import * as fs from "fs";
import * as childProcess from "child_process";
import { stringify } from "querystring";

// Allowed characters: ({[/>+!-=\]})
// JS base types: Strings, Numbers, Booleans, Arrays, Objects
// Merge base types -> Type Coercion

const numbers = {};
const alphabet = {};
const chars = {};

numbers["0"] = "+[]";
numbers["1"] = "+!![]";

const genNumber = (number) => {
  if (number === 0) return numbers["0"];
  return Array.from({ length: number }, () => numbers["1"]).join(" + ");
};

const genString = (string) => {
  return Array.from(string, (char) => alphabet[char]).join(" + ");
};

// SETUP: create alphabet
alphabet["a"] = `(!{} + [])[${genNumber(1)}]`;
alphabet["b"] = `({} + [])[${genNumber(2)}]`;
alphabet["c"] = `({} + [])[${genNumber(5)}]`;
alphabet["e"] = `(!{} + [])[${genNumber(4)}]`;
alphabet["f"] = `(!{} + [])[${genNumber(0)}]`;
alphabet["i"] = `(+!![] / +[] + [])[${genNumber(3)}]`;
alphabet["j"] = `({} + [])[${genNumber(3)}]`;
alphabet["l"] = `(!{} + [])[${genNumber(2)}]`;
alphabet["n"] = `(+!![] / +[] + [])[${genNumber(1)}]`;
alphabet["o"] = `({} + [])[${genNumber(1)}]`;
alphabet["r"] = `(!!{} + [])[${genNumber(1)}]`;
alphabet["s"] = `(!{} + [])[${genNumber(3)}]`;
alphabet["t"] = `(!!{} + [])[${genNumber(0)}]`;
alphabet["u"] = `(!!{} + [])[${genNumber(2)}]`;
alphabet["y"] = `(+!![] / +[] + [])[${genNumber(7)}]`;
alphabet["g"] = `([] + ([] + [])[${genString("constructor")}])[${genNumber(14)}]`;
alphabet["d"] = `([] + ([] + [])[${genString("constructor")}])[${genNumber(30)}]`;
alphabet["h"] = "h";
alphabet["k"] = "k";
alphabet["m"] = "m";
alphabet["p"] = "p";
alphabet["q"] = "q";
alphabet["v"] = `([] + ([] + [])[${genString("constructor")}])[${genNumber(25)}]`;
alphabet["w"] = "w";
alphabet["x"] = "x";
alphabet["z"] = "z";
alphabet["A"] = `([]+[][${genString("constructor")}])[${genNumber(9)}]`;
alphabet["B"] = "B";
alphabet["C"] = "C";
alphabet["D"] = "D";
alphabet["E"] = "E";
alphabet["F"] = "F";
alphabet["G"] = "G";
alphabet["H"] = "H";
alphabet["I"] = `(+!![] / +[] + [])[${genNumber(0)}]`;
alphabet["J"] = "J";
alphabet["K"] = "K";
alphabet["L"] = "L";
alphabet["M"] = "M";
alphabet["N"] = `(+{} + [])[${genNumber(0)}]`;
alphabet["O"] = `({} + [])[${genNumber(8)}]`;
alphabet["P"] = "P";
alphabet["Q"] = "Q";
alphabet["R"] = "R";
alphabet["S"] = `([] + ([] + [])[${genString("constructor")}])[${genNumber(9)}]`;
alphabet["T"] = "T";
alphabet["U"] = "U";
alphabet["V"] = "V";
alphabet["W"] = "W";
alphabet["X"] = "X";
alphabet["Y"] = "Y";
alphabet["Z"] = "X";

// SETUP: create chars
chars[" "] = `({} + [])[${genNumber(7)}]`;

// DEBUG
// DEBUG: different type coercions
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
test 53: ${[]["toString"]}
test 54: ${(+![])["toString"]}
test 55: ${([] + [])["toString"]}
test 56: ${(!![])["toString"]}
test 57: ([] + ([] + [])[${genString("constructor")}])[${genNumber(9)}]
test 58: ([] + ([] + [])[${genString("constructor")}])[${genNumber(14)}]
test 59: ([] + ([] + [])[${genString("constructor")}])[${genNumber(25)}]
test 60: ${genString("Array")}.${genString("from")}({${genString("a")}:${genString("b")}})[${genString("constructor")}]
test 61: ${Object.getOwnPropertyNames(Object)}
`);

// console.log(alphabet);
// console.log(numbers);
// console.log(chars);

// OUTPUT: generate encrypted code
const output = `console.log(${genString("console")})`;
fs.writeFileSync("dist/output.js", output);
const outputResponse = childProcess.execSync("node dist/output.js").toString();

console.log(`
| Content - 'output.js'     :
|----------------------------
| ${output}
|
| Executed - 'node output.js:
|----------------------------
| ${outputResponse}
// `);
