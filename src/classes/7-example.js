class UserService {
  constructor(token) {
    // this = {}

    this.authToken = token
    // this = { authToken }
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
userServiceAdmin.request()
console.groupEnd()
