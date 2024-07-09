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

Another way to pass parameters is by using **tsconfig.json**. See an example below:


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

There are many possible configurations for the compiler, see the example below:

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

## Types

With TypeScript, you can define the types you want to receive in your variables or the library itself will infer the types as soon as you assign a value to a variable.

In the example below, TypeScript will throw an error saying that the value assigned to username, in the second assignment, is not of type String.

```ts
let username = 'Guilherme'
username = 1000
```

### Primitive Types
Another way to declare a typed variable is:

```ts
let username: string = 'Guilherme'
let age: number = 20
let hasChild: boolean = true
let weight: float = 72.33
```

### Arrays

```ts
const fruits: string[] = [] // fruits is an array of strings
const product: [string, number] = ['bola', 20.50] // product is a tuple
```

### Interfaces
Interfaces are used to define object types and their properties.

```ts
type User = {
  firstName: string,
  lastName: string
}

let user: User;

```


### Union and Intersection
You can combine two types or two interfaces in the same variable, either by union or intersection. When done by union, both values will be combined. When done by intersection, the object will assume the first used structure.

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

### Function Types

Functions can also be typed in their input parameters and return values.

```ts
function message (user: hasEmail): { to: string, body: string } {
    return {
        to: `to: ${user.name} | ${user.email}`,
        body: 'Hello and goodmorning!'
    }
}

message({ name: 'Guilherme', email: 'gui.cazaroto@gmail.com'})
```

Using arrow function...

```ts
const sum = (...n: number[]) => n.reduce((sum, next) => sum + next)  

sum(1,2,3,4)

```

If you want to make a function dynamic so that it can accept different inputs and outputs within a defined scope, you should create signatures for these functions.


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

### Type Aliases vs Interfaces

Type Aliases are names given to a particular type or to a grouping of possible types. Interfaces describe a data structure, where it is allowed to work with inheritance and merging with other interfaces. Another important point when we talk about interfaces is that they allow declaring method signatures.

```ts
export interface hasPhone {
    name: string
    phone: number
}

export interface hasInternationalPhone extends hasPhone {
  country: string
}
```

### Function Signatures

```ts
// using interface
interface Contact {
  (contact: hasEmail, message: string):void
}

// using types
type Contact = (
  contact: hasEmail,
  message: string
) => void
```

### Classes

**Abstract Classes**

Classes can implement interfaces to define their types.

```ts
interface HasEmail {
  name: string,
  email: string
}

interface HasPhone {
  name: string,
  phone: string
}

// interface usage
class User implements HasEmail {
  email: string
  name: string

  constructor(email: string, name: string) {
    this.email = email
    this.name = name
  }
}

// another way...

class User implements HasEmail {
  constructor(
    public email: string,
    public name: string = 'no email'
  ) {
    // content
  }
}
```

We can define variables outside the constructor.

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


We can also work with abstract classes...

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

### Converting TS to JS

1 - Rename all .js files to .ts, initially allowing implicit Any types. At this first moment, it is important that the code is compiled properly and the tests continue to pass.

2 - Fix the Any types and import types from third-party libraries if necessary.

3 - Enable strict mode and fix the errors.



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

Generics allow a type to be defined during its implementation. This way, certain values become dynamically typed.

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

Example of use in a callback

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

It is also possible to assume the type of the passed argument without explicitly indicating the type.

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

We can also impose limits on the types, specifying the basic properties that the passed type must have. 
In the example below, we explicitly state that we only want types that have the length property.

```ts
interface LengthWise {
  length: number
}

function logginIdentity<Type extends LengthWise> (arg: Type) {
  return arg.length
}
```

In this other example, we will only allow the argument to be one of the keys present in the object.

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");
```

### Top Types

Any: It is useful when we want maximum flexibility.
Example: Promise<any> when there is no need to manipulate the promise result.


```ts
const myAny: any = 'Hello Any'
myAny.foo 
```

 
Unknown: It is useful for private values that we do not want to expose.

 ```ts
const myUnknown: unknown = 'Hello Unknown'
myUnknown.bar // type unknown não permite referenciar valor como 'bar'.
```

Unknown can also be used together with type-guards.

```ts
if (typeof myUnknown === 'string') {
  myUnknown.split('')
}

if (myUnknown instanceof Promise) {
  myUnknown.then(res => res)
}
```

We can create our own type guards using 'Is' and 'As'.

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
  
The never type indicates that a value should never be assigned or returned. 
Functions that always throw an exception or have an infinite loop are examples. 
While never cannot receive any assignment, the void type can receive undefined and null.
  
 ```ts
 function callException (): never {
  throw new Error('ocorreu um erro') 
 }
 ```
  
### Keyof  
Allows referencing the keys of a certain interface and using them in type composition.

  
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
In the example below, the type will be defined based on a condition. If a promise is passed, the type will be the return type of the promise; otherwise, the type will be the one passed to the Generic.
  
```ts
type conditionalType<T> = T extends Promise<infer S> ? S : T 

let a: conditionalType<Promise<number>>
let b: conditionalType<string[]>
```

 ### Partial
Transforms all properties of a type into optional.

```ts
interface User {
  name: string
  age: number
  occupation: string
}

type userData = Partial<User>
```
  
### Pick
Allows us to pick one or more properties from another type/interface.

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
Allows extracting only a specific subtype from a passed type.

```ts
type onlyNumbers = Extract<'a' | 'b' | 1 | 2, number>
let nums: onlyNumbers
nums = 'a' // dispara um erro
nums = 1
```
  
 ### Exclude
Excludes a specific subtype from a passed type.
 
 ```ts
type noNumbers = Extract<'a' | 'b' | 1 | 2, number>
let nums: noNumbers
nums = 'a'
nums = 1 // dispara um erro
```
  
### Readonly
Creates an object whose properties cannot be reassigned.
 
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
Constructs a type with the set of properties passed in the first argument (keys), assuming they will also have the type passed in the second argument (type).
 
```ts
  interface InfoPage {
  title: string;
}
 
type Page = "home" | "about" | "contact";
 
const nav: Record<Page, InfoPage> = {
  about: { title: "welcome to about page" },
  contact: { title: "welcome to contact page" },
  home: { title: "welcome to home page" },
};
 ```
  
### Omit
Allows creating a new type from an existing one, omitting some properties.
  
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

### Declaration Merging

If you declare different data categories using the same name, they will be merged. You can access each of them according to the context.

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


// we can access both context, after merge it
let album: Album = {
  artist: 'Bowie',
  label: 'VR'
};

let space = new Album()
space.label
space.artist

let band = new Album.Band()
```
