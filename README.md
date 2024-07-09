# Learning Typescript

### Instalação

```node
yarn add -D typescript
```

### Compiling the first script


Create a **index.ts** file and then add the code

```ts
function greet (name: string):void {
  console.log(`Hello ${name}`)
}

greet('Gui')

export default greet
```

To compile, use the command

```node
npx tsc index.ts
```

You can add additional parameters during the transpilation process:

```node
npx tsc index.ts --target es2015 --module commonjs --watch
```

In the above example, the code will be transpiled to es2015, using the "commonjs" export pattern. Additionally, the transpiler will keep listening for future changes in the codebase.
_____________________________________________________________________________________________________________________

Uma outra forma de passar parâmetros, é com a utilização do **tsconfig.json**. Veja abaixo um exemplo:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2017",
    "outDir": "lib"
  },
  "include": ["src"]
}
```

Existem muitas configurações possíveis para o compilador, veja no exemplo abaixo:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "module": "commonjs",
    "target": "es2017",
    "outDir": "lib",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "allowJs": true,
    "types": [],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "declaration": true
  },
  "include": ["src"]
}
```
___________________________

## Tipos

Com o typescript você pode definir os tipos que deseja receber em suas variáveis ou a própria biblioteca irá inferir os tipos assim que você atribuir valor a uma variável.

No exemplo abaixo o typescript irá lançar um erro dizendo que o valor atribuído a username, na segunda atribuição, não é do tipo String.
```ts
let username = 'Guilherme'
username = 1000
```

### Tipos primitivos
O outro jeito de iniciar uma variável tipada é:

```ts
let username: string = 'Guilherme'
let age: number = 20
let hasChild: boolean = true
let weight: float = 72.33
```

### Arrays

```ts
const fruits: string[] = [] // fruits é um array de strings
const product: [string, number] = ['bola', 20.50] // product é uma tupla que contem uma string e um número
```

### Interfaces
São utilizados para definir tipos de objetos e suas propriedades.

```ts
type User = {
  firstName: string,
  lastName: string
}

let user: User;

```


### União e intersecção
Você pode combinar dois tipos ou duas interfaces em uma mesma variável, sendo que isso pode ser feito por união ou intersecção. Quando feito por união, ambos os valores serão combinados. Quando feito por interseção o objeto assumirá a primeira estrutura utilizada.

```ts
export interface hasPhone {
    name: string
    phone: number
}

export interface hasEmail {
    name: string
    email: string
}

const user: hasEmail & hasPhone  // intersecção
const user: hasEmail | hasPhone // união

```

### Tipos em funções

As funções também podem ser tipadas nos parâmetros de entrada e no retorno.

```ts
function message (user: hasEmail): { to: string, body: string } {
    return {
        to: `to: ${user.name} | ${user.email}`,
        body: 'Hello and goodmorning!'
    }
}

message({ name: 'Guilherme', email: 'gui.cazaroto@gmail.com'})
```

Com arrow function...
```ts
const sum = (...n: number[]) => n.reduce((sum, next) => sum + next)  

sum(1,2,3,4)

```

Caso queira tornar uma função dinâmica para que posso inserir diferentes entradas e saídas dentro de um escopo definido, deverá criar assinaturas para essas funções.

```ts
export interface hasPhone {
    name: string
    phone: number
}

export interface hasEmail {
    name: string
    email: string
}

function sendMessage(method: 'phone', to: hasPhone):void
function sendMessage(method: 'email', to: hasEmail):void

function sendMessage (method: 'email' | 'phone', to: hasPhone | hasEmail) {
    return `sending message to: ${to.name} by ${method}`
}

// it works
sendMessage('email', { name: 'Guilherme', email: 'gui.cazaroto@gmail.com' })
sendMessage('phone', { name: 'Guilherme', phone: 993845793 })

// throw error
sendMessage('email', { name: 'Guilherme', phone: 993845793 })
sendMessage('phone', { name: 'Guilherme', phone: 'gui.cazaroto@gmail.com' })

```

### Types Alias Vs Interfaces

Types Alias são nomes dados para um determinado tipo ou para um agrupamento de tipos possíveis. Enquanto as interfaces descrevem uma estrutura de dados, onde é permitido trabalhar com herança e mesclagem com outras interfaces.
Outro ponto importante quando falamos de interfaces é que elas permitem declarar assinaturas de métodos.

```ts
export interface hasPhone {
    name: string
    phone: number
}

export interface hasInternationalPhone extends hasPhone {
  country: string
}
```

### Assinaturas de funções

```ts
// com interface
interface Contact {
  (contact: hasEmail, message: string):void
}

// com tipos
type Contact = (
  contact: hasEmail,
  message: string
) => void
```

### Classes

**Classes Abstratas**

As classes podem implementar as interfaces para definir seus tipos

```ts
interface HasEmail {
  name: string,
  email: string
}

interface HasPhone {
  name: string,
  phone: string
}

// utilização das interfaces
class User implements HasEmail {
  email: string
  name: string

  constructor(email: string, name: string) {
    this.email = email
    this.name = name
  }
}

// outra forma de implementar as interfaces seria...

class User implements HasEmail {
  constructor(
    public email: string,
    public name: string = 'no email'
  ) {
    // content
  }
}
```

Podemos definir variáveis externas ao construtor.

```ts
class User implements HasEmail, HasPhone {
  readonly initState = 'BEGIN'
  public age: number;
  private options!: string

  constructor(
    public email: string,
    public name: string = 'no email',
    public phone: string
  ) {
    // content
    this.age = 27
  }

  async init () {
    this.options = await fetch('https://api.com')
      .then(res => res.json())
      .then(res => res)
    
    return this.options
  }
}
```


Podemos, ainda, trabalhar com classes abstratas...

```ts
abstract class BaseRepository {
  constructor(
    protected serviceName: string
  ) {
    this.serviceName = serviceName
  }

  abstract sendServiceRequest (): void
}

class UserRepository extends BaseRepository {
  constructor (serviceName: string) {
    super(serviceName)
  }

  sendServiceRequest () {
    console.log('sending request...')
  }
}
```

### Convertendo TS para JS

1 - Renomeie todos os arquivos .js para .ts, permitindo inicialmente tipos implícitos Any. Nesse primeiro momento é importante que o código seja compilado adequadamente e os testes continuem passando.

2 - Corrija os tipos Any e importe tipos de bibliotecas de terceiros, caso seja necessário.

3 - ative o modo estrito e corrija os erros.

**tsconfig.json**
```js
"compilerOptions": {
    [...]
    strictNullChecks: true
    strict: true
    strictFunctionTypes: true
    strictBindCallApply: true
}
```

### Generics

Permite que um tipo seja definido durante o processo de implementação do mesmo. Dessa forma determinados valores passam a ter o tipo dinâmico.

```ts
interface Gen<T> {
  name: string,
  age: number,
  value: T
}

const data: Gen<String> = {
  name: 'Guilherme',
  age: 23,
  value: 'Wineano'
} 
```

Exemplo de uso em um callback

```
interface callbackOne<T, R = void> {
  (message: T): R
}

type callbackOne<T, R = void> = (message: T) => R


function message(callback: callbackOne<String>) {
  callback('Hi Everyone!')
}

message((message) => console.log(message))
```

Também é possível assumir o tipo do argumento passado, sem precisar indicar o tipo explicitamente.

```
function resolvePromise<T>(prom: Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    prom
      .then(res =>  resolve(res))
      .catch(err => reject(err))
  })
}


resolvePromise(fetch('https://api.nuxt.com'))
```

Também podemos impor limites aos tipos, dizendo quais as propriedades básicas que o tipo passado deve possuir.
No exemplo abaixo deixamos explicito que só queremos tipos que possuam a propriedade lenngth

```ts
interface LengthWise {
  length: number
}

function logginIdentity<Type extends LengthWise> (arg: Type) {
  return arg.length
}
```

Neste outro exemplo só permitiremos que o valor passado por argumento seja uma das chaves presentes no objeto.

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");
```

### Top Types

Any: é útil quando queremos o máximo de flexibilidade.
Ex: Promise<any> quando não existe a necessidade demanipular o resultado a promise.

```ts
const myAny: any = 'Hello Any'
myAny.foo 
```

 
 Unknown: é útil para valores privados que nós não queremos expor

 ```ts
const myUnknown: unknown = 'Hello Unknown'
myUnknown.bar // type unknown não permite referenciar valor como 'bar'.
```

Unknown também pode ser utlizado em conjunto com type-guards
```ts
if (typeof myUnknown === 'string') {
  myUnknown.split('')
}

if (myUnknown instanceof Promise) {
  myUnknown.then(res => res)
}
```


Podemos criar nossos próprios type guards com o uso de 'Is' e 'As'

```ts
interface HasEmail {
  name: string,
  email: string
}

interface HasPhone {
  name: string,
  phone: string
}

function isEmailContact (contact: HasEmail | HasPhone): contact is HasEmail {
  return 'email' in contact
}

function showContact(contact: HasEmail | HasPhone) {
  if (isEmailContact(contact)) {
    console.log(`Hi my name is ${contact.name} and my contact is ${contact.email}`)
  } else {
    console.log(`Hi my name is ${contact.name} and my contact is ${contact.phone}`)
  }
}

```

### Bottom types
  
O type never diz que nunca deve ser atribuído ou retornado um valor. Como funções que sempre retornam uma exceção ou que possuem um loop infinito.
Enquanto never não pode receber nenhum atribuição, o tipo 'void' pode receber undefined e null.
  
 ```ts
 function callException (): never {
  throw new Error('ocorreu um erro') 
 }
 ```
  
  ### Keyof
  
Permite referenciar as chaves de uma determinada interface e usá-la na composição dos tipos.
  
```ts
interface HasEmail {
  name: string,
  email: string
}

interface HasPhone {
  name: string,
  phone: number
}

interface communicationMethods {
  email: HasEmail
  phone: HasPhone
  fax: { number: number }
}

function sendMessage<T extends keyof communicationMethods>(
  method: T , contact: communicationMethods[T]
) {}

sendMessage('email', { name: 'Guilherme', email: 'gui.cazaroto@gmail.com'})
sendMessage('phone', { name: 'Guilherme', phone: 278374857 })
sendMessage('fax', { number: 27837485749 })
```
  
### Ternários
no exemplo abaixo os tipo será definidos com base em uma condição, se for passado uma promise, o tipo será igual o tipo do retorno da promise, caso contrário o tipo será igual ao passado ao Generic.
  
```ts
type conditionalType<T> = T extends Promise<infer S> ? S : T 

let a: conditionalType<Promise<number>>
let b: conditionalType<string[]>
```

 ### Partial
  Transforma todas as propriedades de um tipo em opcionais.

```ts
interface User {
  name: string
  age: number
  occupation: string
}

type userData = Partial<User>
```
  
### Pick
Permite que peguemos uma ou mais propriedades de um outro tipo/interface

```ts
interface User {
  name: string
  age: number
  occupation: string,
  company: string
}

type userData = Partial<User>

type Professional = Pick<User, 'occupation' | 'company'>
```
  
### Extract
Permite extrair apenas um subtipo específico de um tipo passado.

```ts
type onlyNumbers = Extract<'a' | 'b' | 1 | 2, number>
let nums: onlyNumbers
nums = 'a' // dispara um erro
nums = 1
```
  
 ### Exclude
 Exclui um subtipo específico de um tipo passado.
 
 ```ts
type noNumbers = Extract<'a' | 'b' | 1 | 2, number>
let nums: noNumbers
nums = 'a'
nums = 1 // dispara um erro
```
  
### Readonly
Cria um objeto cujos as propriedades não poderão ser reatribuídas
 
```ts
let user: Readonly<User> = {
  name: 'Guilherme',
  age: 20,
  occupation: 'dev',
  company: 'wine'
}

user.name = 'Jonas'
```
### Record
Constrói um tipo com o conjunto de propriedades passadas no primeiro argumento (keys), assumindo que elas também terão o tipo passado no segundo argumento (type).
 
```ts
  interface InfoPagina {
  titulo: string;
}
 
type Pagina = "inicio" | "sobre" | "contato";
 
const nav: Record<Pagina, InfoPagina> = {
  sobre: { titulo: "bem vindo a página - sobre" },
  contato: { titulo: "bem vindo a página - contato" },
  inicio: { titulo: "bem vindo a página - inicio" },
};
 ```
  
### Omit
Permite criar um novo tipo a partir de um já existente, omitindo algumas propriedades.
  
```ts
interface Music {
    title: string
    author: string
    style: string
    duration: number
}

type folkMusic = Omit<Music, "style">
  
let myMusic:folkMusic = {
    title: 'Like a rolling stone',
    author: 'Bob Dylan',
    duration: 5.34
}
```

  ### Merge de declarações

Caso você declare diferentes categorias de dados utilizando o mesmo nome, elas serão integradas. Sendo que, você poderá acessar cada uma delas de acordo com o contexto.

```ts
interface Album {
  artist: string
}

class Album {
  label = new Album.Band()
}

namespace Album {
  export class Band {}
}


// podemos acessar ambos os contextos, após ser feito o merge
let album: Album = {
  artist: 'Bowie',
  label: 'VR'
};

let space = new Album()
space.label
space.artist

let band = new Album.Band()
```
