type Todo = {
  title: string,
  description: string,
  completed: boolean
}

// Readonly, torna o objeto disponível apenas para leitura, impedindo reatribuições.
const todo1: Readonly<Todo> = {
  title: 'Lavar roupa',
  description: 'Colocar na lavadora e apertar o botao',
  completed: false
}


// todo.completed = true // throw an error

console.log(todo1)

// Partial, deixa que o objeto contenha somente partes do tipo, portanto
// não precisa ter necessariamente as propriedades do objeto.
function updateTodo (todo: Todo, toUpdate: Partial<Todo>) {
  return { ...todo, ...toUpdate }
}

const todo2 = updateTodo(todo1, { completed: true })

console.log(todo2)

// Pick, permite pegar apenas as propriedades que desejar de um determinado tipo.
const p: Pick<Todo, 'title' | 'completed'> = {
  title: 'Lavar roupa',
  completed: false
} 

// Omit, vai omitir as propriedades informadas
const o: Omit<Todo, 'title'> = {
  description: 'Texto qualquer',
  completed: true
}