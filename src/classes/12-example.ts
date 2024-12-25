class UserFixture {
  // eslint-disable-next-line
  name(name: any) {
    throw new Error('Method not implemented.')
  }
  #name: string

  constructor() {
    // fakerjs
    this.#name = 'User' + Math.random().toString(36).substr(2, 8)
  }

  getName() {
    return this.#name
  }
}

const userFixture1 = new UserFixture()
console.log(userFixture1.getName())
// userFixture1.name = 'User' + Math.random().toString(36).substr(2, 8)
console.log(userFixture1.getName())

const userFixture2 = new UserFixture()
console.log(userFixture2.getName())
