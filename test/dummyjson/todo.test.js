import { TodoSchema, TodoService, TodoFixture } from '../../framework'
import { faker } from '@faker-js/faker'

describe('Todo', () => {
  it('Should return a todo', async () => {
    const response = await TodoService.get(1)
    expect(response.status).toBe(200)
    expect(response.data).toMatchSchema(TodoSchema)
  })

  it('Should return 404 if todo not exits', async () => {
    const response = await TodoService.get(10_000)
    expect(response.status).toBe(404)
    expect(response.data).toStrictEqual({
      message: "Todo with id '10000' not found"
    })
  })

  it('Should return a random todo', async () => {
    const response = await TodoService.getRandom()
    expect(response.status).toBe(200)
    expect(response.data).toMatchSchema(TodoSchema)
  })

  it('Should return all todo by user id', async () => {
    const response = await TodoService.getAllByUserId(1)
    expect(response.status).toBe(200)
    expect(response.data).toMatchObject({
      limit: 2,
      skip: 0,
      total: 2,
      todos: expect.any(Array)
    })
    expect(response.data.todos.length).toBe(2)
    for (const todo of response.data.todos) {
      expect(todo).toMatchSchema(TodoSchema)
    }
  })

  it('Should correct add new todo', async () => {
    const newTodo = TodoFixture.createTodo(5)
    const response = await TodoService.add(newTodo)
    expect(response.status).toBe(201)
    expect(response.data).toMatchSchema(TodoSchema)
    expect(response.data).toMatchObject(newTodo)
  })

  it('Should return error if userId not found', async () => {
    const id = 100_000
    const newTodo = TodoFixture.createTodo(id)
    const response = await TodoService.add(newTodo)
    expect(response.status).toBe(404)
    expect(response.data).toEqual({
      message: `User with id '${id}' not found`
    })
  })

  it('Should correct update todo', async () => {
    const todoId = 5
    const data = {
      todo: faker.word.words(5)
    }

    const response = await TodoService.update(todoId, data)
    expect(response.status).toBe(200)
    expect(response.data).toMatchSchema(TodoSchema)
    expect(response.data).toMatchObject({
      ...data,
      id: todoId
    })
  })

  it('Should delete todo', async () => {
    const todoId = 1

    const response = await TodoService.delete(todoId)

    expect(response.status).toBe(200)
  })
})
