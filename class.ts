abstract class UserAccount {
  readonly name: string
  private age: number

  constructor (name: string, age: number) {
    this.name = name
    this.age = age
  }

  logDetails(): void {
    console.log(`Usern name is ${this.name} and age is ${this.age}`)
  }
}
class UserAvatar extends UserAccount {
  private nick: string
  private level: number

  constructor (name: string, age: number, nick: string, level: number) {
    super(name, age)
    this.nick = nick
    this.level = level
  }

  get getLevel () {
    return this.level
  }
}

const avatar = new UserAvatar('Guilherme', 26, 'guicazaroto', 80)
avatar.logDetails()
console.log(avatar.getLevel)
