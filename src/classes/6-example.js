function UserService(token) {
  const self = {
    authToken: token
  }

  const printToken = () => {
    console.log('[PRINT] Token: ' + self.authToken)
  }

  return {
    printToken
  }
}

console.group('UserService 1')
const tokenAdmin = 'secret'
const userServiceAdmin = UserService(tokenAdmin) // .constructor
console.groupEnd()

console.group('UserService 2')

const tokenManager = 'other token'
const userServiceManager = UserService(tokenManager) // .constructor
console.groupEnd()

console.log('admin', userServiceAdmin)
userServiceAdmin.printToken()
console.log('manager', userServiceManager)
userServiceManager.printToken()
