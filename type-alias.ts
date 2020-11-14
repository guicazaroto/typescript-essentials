type id = number | string
type platform = 'Windows' | 'OSX'

function logUser (uid: id) {
  return `User with id: ${uid}`
}

function logSystem (platform: platform) {
  return platform
}

logUser(1)
logSystem('OSX')