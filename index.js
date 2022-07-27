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

const generateNumber = (number) => {
    if (number === 0) return numbers["0"];
    return Array.from({ length: number }, () => numbers["1"]).join(" + ");
};

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
alphabet: ${alphabet}
numbers: ${numbers}
chars: ${chars}
`);

// OUTPUT: generate encrypted code
const output = `console.log(${generateNumber(15)})`;
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
