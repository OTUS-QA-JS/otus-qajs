import { TodoSchema, TodoService } from '../../framework'

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

  it.todo('Should correct add new todo')
  it.todo('Should correct update todo')
  it.todo('Should delete todo')
})
