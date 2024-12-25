class UserFixture13 {
  #name

  email = ''

  constructor() {
    // fakerjs
    this.#name = 'User' + Math.random().toString(36).substr(2, 8)
  }

  get name() {
    return this.#name
  }

  set name(name) {
    if (!name) {
      throw new Error('No name provided')
    }
    // debugger
    this.#name = name
  }

  setName(name) {
    this.#name = name
  }
}

const userFixture13_1 = new UserFixture13()
console.log(userFixture13_1.name)
userFixture13_1.name = 'User' + Math.random().toString(36).substr(2, 8)
// userFixture13_1.setName('User' + Math.random().toString(36).substr(2, 8))
console.log(userFixture13_1.name)

const userFixture13_2 = new UserFixture13()
console.log(userFixture13_2.name)
