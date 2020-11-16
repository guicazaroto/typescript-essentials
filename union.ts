// Union permite que haja dois diferentes tipos
function logUnion (id: number | string, name: string) {
  return `user id: ${id}, name: ${name}`
}

logUnion(1, 'Guilherme');