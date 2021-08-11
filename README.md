# typescript

### Instalação

```
yarn add -D typescript
```

### Compilando o primeiro script

Crie um arquivo **index.ts** e em seguida adicione o código

```
function greet (name: string):void {
  console.log(`Hello ${name}`)
}

greet('Guilherme')

export default greet
```

Para compilar use o comando
```
npx tsc index.ts
```

Você pode adicionar parâmetros adicionais durante o processo de transpilação:

```
npx tsc index.ts --target es2015 --module commonjs --watch
```

No exemplo acima o código será transpilado para es2015, utilizando o padrão de export "commonjs". Além disso o transpilador ficará escutando futuras alterações na base de código. 

_____________________________________________________________________________________________________________________

Uma outra forma de passar parâmetros, é com a utilização do **tsconfig.json**. Veja abaixo um exemplo:

```
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

```
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
```
let username = 'Guilherme'
username = 1000
```

### Tipos primitivos
O outro jeito de iniciar uma variável tipada é:

```
let username: string = 'Guilherme'
let age: number = 20
let hasChild: boolean = true
let weight: float = 72.33
```

### Arrays

```
const fruits: string[] = [] // fruits é um array de strings
const product: [string, number] = ['bola', 20.50] // product é uma tupla que contem uma string e um número
```

### Interfaces
São utilizados para definir tipos de objetos e suas propriedades.

```
type User = {
  firstName: string,
  lastName: string
}

let user: User;

```


### União e intersecção
Você pode combinar dois tipos ou duas interfaces em uma mesma variável, sendo que isso pode ser feito por união ou intersecção. Quando feito por união, ambos os valores serão combinados. Quando feito por interseção o objeto assumirá a primeira estrutura utilizada.

```
export interface hasPhone {
    name: string
    phone: number
}

export interface hasEmail {
    name: string
    email: string
}

const user: hasEmail & hasPhone  // união
const user: hasEmail | hasPhone // intersecção

```




