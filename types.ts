// boolean
let isOpen: boolean
isOpen = true

// string
let msg: string
msg = 'foo'

// number
let total: number
total = 1.2

// Array
let myArr: number[]
myArr = [1,2,3]

let items: Array<number>
items = [1,2,3]

// tuple
let tup: [number, string]
tup = [1, 'hey']

// enum
enum Colors {
  white = '#ffffff',
  black = '#000000'
}

// any (não recomendado)
let a: any

// void 
function log (): void {
  console.log('Hello')
}

// null / undefined
type foo = string | undefined

// never
function err (): never {
  throw new Error('ocorreu um erro')
}

// object (qualquer coisa que não seja tipo primitivo)
