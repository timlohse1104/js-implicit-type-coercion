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

const test1 = !{};
const test2 = !!{};
const test3 = +[];
const test4 = -[];
const test5 = +{};
const test6 = -{};
const test7 = {} + [];
const test8 = +!!{};

console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);
console.log(test5);
console.log(test6);
console.log(test7);
console.log(test8);

console.log("2" + -[]);

console.log(alphabet);
console.log(numbers);
console.log(numbers[0]);
console.log(chars);
console.log(generateNumber(3));

const output = `console.log(${generateNumber(15)})`;
fs.writeFileSync("output.js", output);
const outputResponse = childProcess.execSync("node output.js").toString();

console.log(`
| Content - 'output.js'     :
|----------------------------
| ${output}
|
| Executed - 'node output.js:
|----------------------------
| ${outputResponse}
`);
