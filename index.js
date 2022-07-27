import * as fs from "fs";
import * as childProcess from "child_process";

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

// SETUP: create alphabet
alphabet["a"] = `(!{} + [])[${genNumber(1)}]`;
alphabet["b"] = "b";
alphabet["c"] = "c";
alphabet["d"] = "d";
alphabet["e"] = `(!{} + [])[${genNumber(4)}]`;
alphabet["f"] = `(!{} + [])[${genNumber(0)}]`;
alphabet["g"] = "g";
alphabet["h"] = "h";
alphabet["i"] = "i";
alphabet["j"] = "j";
alphabet["k"] = "k";
alphabet["l"] = `(!{} + [])[${genNumber(2)}]`;
alphabet["m"] = "m";
alphabet["n"] = "n";
alphabet["o"] = "o";
alphabet["p"] = "p";
alphabet["q"] = "q";
alphabet["r"] = `(!!{} + [])[${genNumber(1)}]`;
alphabet["s"] = `(!{} + [])[${genNumber(3)}]`;
alphabet["t"] = `(!!{} + [])[${genNumber(0)}]`;
alphabet["u"] = `(!!{} + [])[${genNumber(2)}]`;
alphabet["v"] = "v";
alphabet["w"] = "w";
alphabet["x"] = "x";
alphabet["y"] = "y";
alphabet["z"] = "z";
alphabet["A"] = "A";
alphabet["B"] = "B";
alphabet["C"] = "C";
alphabet["D"] = "D";
alphabet["E"] = "E";
alphabet["F"] = "F";
alphabet["G"] = "G";
alphabet["H"] = "H";
alphabet["I"] = "I";
alphabet["J"] = "J";
alphabet["K"] = "K";
alphabet["L"] = "L";
alphabet["M"] = "M";
alphabet["N"] = `(+{} + [])[${genNumber(0)}]`;
alphabet["O"] = "O";
alphabet["P"] = "P";
alphabet["Q"] = "Q";
alphabet["R"] = "R";
alphabet["S"] = "S";
alphabet["T"] = "T";
alphabet["U"] = "U";
alphabet["V"] = "V";
alphabet["W"] = "W";
alphabet["X"] = "X";
alphabet["Y"] = "Y";
alphabet["Z"] = "X";

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
test 24: ${(+{} + [])[1]}
test 25: ${(+{} + [])[2]}
alphabet: ${alphabet}
numbers: ${numbers}
chars: ${chars}
`);

// OUTPUT: generate encrypted code
const output = `console.log(${alphabet["r"]} + ${alphabet["e"]} + ${
  alphabet["s"]
} + ${alphabet["t"]} + (${genNumber(15)}))`;
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
`);
