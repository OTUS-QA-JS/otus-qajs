const self = {}

class UserService {
  constructor(token) {
    // this = {}

    // this.authToken = token
    self.authToken = token
  }

  printToken() {
    console.log('[PRINT] Token: ' + self.authToken)
  }
}

console.group('UserService 1')
const tokenAdmin = 'secret'
const userServiceAdmin = new UserService(tokenAdmin) // .constructor
console.groupEnd()

console.group('UserService 2')

const tokenManager = 'other token'
const userServiceManager = new UserService(tokenManager) // .constructor
console.groupEnd()

console.log('admin', userServiceAdmin)
userServiceAdmin.printToken()
console.log('manager', userServiceManager)
userServiceManager.printToken()
