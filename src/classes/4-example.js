class UserService {
  constructor(token) {
    // this = {}

    console.log('Token: ' + token)

    this.authToken = token
  }
}

console.group('UserService 1')
const token1 = 'secret'
const userService1 = new UserService(token1) // .constructor
console.log(userService1)
console.log(`userService1.token = ${userService1.authToken}`)
console.groupEnd()

console.group('UserService 2')

const token2 = 'other token'
const userService2 = new UserService(token2) // .constructor
console.log(userService2)
console.log(`userService2.token = ${userService2.authToken}`)

userService2.authToken = 'new token'

console.log(`userService2.token = ${userService2.authToken}`)

console.groupEnd()
