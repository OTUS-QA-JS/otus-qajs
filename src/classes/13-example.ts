class UserFixture13 {
  #name: string

  constructor() {
    // fakerjs
    this.#name = 'User' + Math.random().toString(36).substr(2, 8)
  }

  get name() {
    return this.#name
  }
}

const userFixture13_1 = new UserFixture13()
console.log(userFixture13_1.name)
// @ts-expect-error FIXME
userFixture1.name = 'User' + Math.random().toString(36).substr(2, 8)
console.log(userFixture1.name)

const userFixture13_2 = new UserFixture13()
console.log(userFixture13_2.name)
