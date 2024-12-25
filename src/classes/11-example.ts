class UserService {
  #authToken: string | null = null

  private token: string | null = null

  public constructor(token: string) {
    this.#authToken = token
  }

  #headers() {
    return {
      Authorization: `Bearer ${this.#authToken}`
    }
  }

  public request() {
    const client = {
      method: 'GET',
      url: 'http://localhost:8080/api/users',
      headers: this.#headers()
    }

    console.log('client', client)
  }
}

console.group('UserService')
const tokenAdmin = 'secret'
const userServiceAdmin = new UserService(tokenAdmin) // .constructor
userServiceAdmin.request()
console.groupEnd()
