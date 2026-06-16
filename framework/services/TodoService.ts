import clients from './client'
import { Todo } from '../models/Todo'

const client = clients.clientDummyjson

const getAllTodos = async ({ limit, skip }: { limit?: number; skip?: number }) => {
  const response = await client.get('/todos', {
    params: {
      limit,
      skip
    }
  })

  return {
    status: response.status,
    headers: response.headers,
    data: response.data as Todo[]
  }
}

const getTodo = async (id: number) => {
  const response = await client.get(`/todos/${id}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data as Todo
  }
}

const getRandomTodo = async () => {
  const response = await client.get(`/todos/random`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data as Todo
  }
}

const getAllTodosByUserId = async (userId: number) => {
  const response = await client.get(`/todos/user/${userId}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data as { todos: Todo[] }
  }
}

const addTodo = async (data: Omit<Todo, 'id'>) => {
  const response = await client.post('/todos/add', data)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data as Todo
  }
}

const updateTodo = async (todoId: number, data: Partial<Todo>) => {
  const response = await client.put(`/todos/${todoId}`, data)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data as Todo
  }
}

const deleteTodo = async (id: number) => {
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
