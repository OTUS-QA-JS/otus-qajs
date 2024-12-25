class UserService {
  constructor(token) {
    // this = {}

    console.log('Token: ' + token)

    this.authToken = token
  }
}

const token = 'secret'
const userService = new UserService(token) // .constructor
console.log(userService)
console.log(`userService.token = ${userService.authToken}`)
