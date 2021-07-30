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

Para compilar use o comando **npx tsc index.ts**
