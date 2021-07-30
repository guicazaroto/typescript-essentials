# typescript

### Instalação

```
yarn add -D typescript
```

### Compilando o primeiro script

Crie um arquivo **index.ts** e em seguida adicione o código

```
type User = {
  firstName: string,
  lastName: string
}
function greet (user: User):void {
  const { firstName, lastName } = user
  console.log(`Hello ${firstName} ${lastName}`)
}

greet({ firstName: 'Guilherme', lastName: 'Cazaroto' })

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

=============================================================================================

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



