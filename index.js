// Erlaubte Zeichen: ({[/>+!-=\]})
// JS Basistypen: Strings, Numbers, Booleans, Arrays, Objects
// Basistypen mit einander verschmelzen -> Type Coercion

const zahlen = {}
const buchstaben = {}
const zeichen = {}

zahlen['0'] = '+[]'
zahlen['1'] = '+!![]'

const erzeugeZahl = zahl => {
    if(zahl === 0) return zahlen['0']
    return Array.from({length: zahl}, () => zahlen['1']).join('+') 
}

const test1 = !{}
const test2 = !!{}
const test3 = +[]
const test4 = -[]
const test5 = +{}
const test6 = -{}
const test7 = {}+[]
const test8 = +!!{}

console.log(test1)
console.log(test2)
console.log(test3)
console.log(test4)
console.log(test5)
console.log(test6)
console.log(test7)
console.log(test8)

console.log('2'+ -[])

console.log(buchstaben)
console.log(zahlen)
console.log(zahlen[0])
console.log(zeichen)
console.log(erzeugeZahl(0))
console.log(erzeugeZahl(1))
console.log(erzeugeZahl(2))
console.log(erzeugeZahl(3))
