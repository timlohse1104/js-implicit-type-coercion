// Allowed characters: ({[/>+!-=\]})
// JS base types: Strings, Numbers, Booleans, Arrays, Objects
// Merge base types -> Type Coercion
export class TypeCoercionCompiler {
  numbers = { 0: '+[]', 1: '+!![]' };
  alphabet = {};

  constructor() {
    this.setupAlphabet();
  }

  setupAlphabet() {
    this.alphabet['a'] = `(!{} + [])[${this.genNumber(1)}]`;
    this.alphabet['b'] = `({} + [])[${this.genNumber(2)}]`;
    this.alphabet['o'] = `({} + [])[${this.genNumber(1)}]`;
    this.alphabet['e'] = `(!{} + [])[${this.genNumber(4)}]`;
    this.alphabet['c'] = `({} + [])[${this.genNumber(5)}]`;
    this.alphabet['t'] = `(!!{} + [])[${this.genNumber(0)}]`;
    this.alphabet[' '] = `({} + [])[${this.genNumber(7)}]`;
    this.alphabet['f'] = `(!{} + [])[${this.genNumber(0)}]`;
    this.alphabet['s'] = `(!{} + [])[${this.genNumber(3)}]`;
    this.alphabet['r'] = `(!!{} + [])[${this.genNumber(1)}]`;
    this.alphabet['u'] = `(!!{} + [])[${this.genNumber(2)}]`;
    this.alphabet['i'] = `(+!![] / +[] + [])[${this.genNumber(3)}]`;
    this.alphabet['n'] = `(+!![] / +[] + [])[${this.genNumber(1)}]`;
    this.alphabet['S'] = `([] + ([] + [])[${this.genString('constructor')}])[${this.genNumber(9)}]`;
    this.alphabet['g'] = `([] + ([] + [])[${this.genString('constructor')}])[${this.genNumber(14)}]`;
    this.alphabet['p'] = `([] + (/-/)[${this.genString('constructor')}])[${this.genNumber(14)}]`;
    this.alphabet['\\'] = `(/\\\\/+[])[${this.genNumber(1)}]`;
    this.alphabet['d'] = `([] + ([] + [])[${this.genString('constructor')}])[${this.genNumber(30)}]`;
    this.alphabet['h'] = `(${this.genNumber(17)})[${this.genString('toString')}](${this.genNumber(18)})`;
    this.alphabet['m'] = `(${this.genNumber(22)})[${this.genString('toString')}](${this.genNumber(24)})`;
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/escape
    this.alphabet['C'] = `((()=>{})[${this.genString('constructor')}](${this.genString('return escape')})()(${this.alphabet['\\']}))[${this.genNumber(
      2
    )}]`;
  }

  genNumber(number) {
    if (number === 0) return this.numbers['0'];
    return Array.from({ length: number }, () => this.numbers['1']).join(' + ');
  }

  genString(string) {
    return Array.from(string, (char) => {
      if (!(char in this.alphabet)) {
        const charCode = char.charCodeAt(0);
        return `([]+[])[${this.genString('constructor')}][${this.genString('fromCharCode')}](${this.genNumber(charCode)})`;
      }
      return this.alphabet[char];
    }).join('+');
  }

  compile(code) {
    return `(()=>{})[${this.genString('constructor')}](${this.genString(code)})()`;
  }
}
