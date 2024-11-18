import clients from './client'

const client = clients.clientDummyjson

const getAllTodos = async ({ limit, skip }: any) => {
  const response = await client.get('/todos', {
    params: {
      limit,
      skip
    }
  })

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const getTodo = async (id: any) => {
  const response = await client.get(`/todos/${id}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const getRandomTodo = async () => {
  const response = await client.get(`/todos/random`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const getAllTodosByUserId = async (userId: any) => {
  const response = await client.get(`/todos/user/${userId}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const addTodo = async (data: any) => {
  const response = await client.post('/todos/add', data)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const updateTodo = async (todoId: any, data: any) => {
  const response = await client.put(`/todos/${todoId}`, data)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const deleteTodo = async (id: any) => {
  const response = await client.delete(`/todos/${id}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

export default {
  getAll: getAllTodos,
  get: getTodo,
  getRandom: getRandomTodo,
  getAllByUserId: getAllTodosByUserId,
  add: addTodo,
  update: updateTodo,
  delete: deleteTodo
}
