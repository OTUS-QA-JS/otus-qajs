class UserService {
  authToken = null

  constructor(token) {
    this.authToken = token
  }

  headers() {
    return {
      Authorization: `Bearer ${this.authToken}`
    }
  }

  request() {
    const client = {
      method: 'GET',
      url: 'http://localhost:8080/api/users',
      headers: this.headers()
    }

    console.log('client', client)
  }
}

console.group('UserService')
const tokenAdmin = 'secret'
const userServiceAdmin = new UserService(tokenAdmin) // .constructor
userServiceAdmin.authToken = 'wrong token'
userServiceAdmin.request()
console.groupEnd()
