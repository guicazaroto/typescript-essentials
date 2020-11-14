// Union permite que haja dois diferentes tipos
function logUser (id: number | string, name: string) {
  return `user id: ${id}, name: ${name}`
}

logUser(1, 'Guilherme');