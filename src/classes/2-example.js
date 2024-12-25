class UserService {
  constructor(token) {
    // this = {}

    console.log('Token: ' + token)
  }
}

const token = 'secret'
const userService = new UserService(token) // .constructor
console.log(userService)
