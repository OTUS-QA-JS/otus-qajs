const baseUrl = 'https://reqres.in/api'

type UserId = number | string

interface UserPayload {
  name?: string
  job?: string
  [key: string]: string | number | boolean | undefined
}

interface UsersQueryParams {
  page?: number
  per_page?: number
}

async function fetchUsers(queryParams: UsersQueryParams = {}) {
  const response = await fetch(`${baseUrl}/users?${new URLSearchParams(toSearchParams(queryParams))}`)
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

function toSearchParams(queryParams: UsersQueryParams): Record<string, string> {
  return Object.fromEntries(Object.entries(queryParams).map(([key, value]) => [key, String(value)]))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchUser(id: UserId) {
  const response = await fetch(`${baseUrl}/users/${id}`)
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function updateUser(id: UserId, data: UserPayload) {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function putUser(id: UserId, data: UserPayload) {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function deleteUser(id: UserId) {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'DELETE'
  })
  return {
    status: response.status,
    headers: response.headers
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function createUser(data: UserPayload) {
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

;(async () => {
  try {
    const response = await fetchUsers({
      page: 100,
      per_page: 1
    })
    console.log('status', response.status)
    console.log('data', response.data)
  } catch (error) {
    console.error('Не получилось выполнить запрос', error)
  }
})()
