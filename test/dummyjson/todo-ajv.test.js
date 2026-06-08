import { TodoService, TodoFixture } from '../../framework'
import { faker } from '@faker-js/faker'

import Ajv from 'ajv'
const TodoSchema = {
  $id: 'todoSchema',
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    completed: {
      type: 'boolean'
    },
    todo: {
      type: 'string'
    },
    userId: {
      type: 'integer'
    }
  },
  required: ['id', 'completed', 'todo', 'userId'],
  additionalProperties: false
}

const TodosSchema = {
  type: "object",
  properties: {
    todos: {
      type: "array",
      items: {
        type: "object",
        $ref: "todoSchema"
      }
    },
    total: {
      type: 'number'
    },
    skip: {
      type: 'number'
    },
    limit: {
      type: 'number'
    },
  },
  required: ['todos', 'total', 'skip', 'limit'],
  additionalProperties: false
}

const ajv = new Ajv();
ajv.addSchema(TodoSchema);

describe('Todo', () => {
  it('Should return a todo', async () => {
    const validateFunction = ajv.compile(TodoSchema);
    const response = await TodoService.get(1)
    expect(response.status).toBe(200)

    const isValid = validateFunction(response.data);
    expect(validateFunction.errors).toStrictEqual(null);
    expect(isValid).toBe(true);
  })


  it('Should return a random todo', async () => {

    const validateFunction = ajv.compile(TodoSchema);
    const response = await TodoService.getRandom()
    expect(response.status).toBe(200)

    const isValid = validateFunction(response.data);
    expect(validateFunction.errors).toStrictEqual(null);
    expect(isValid).toBe(true);
  })


  it('Should return all todo by user id', async () => {
    const validateFunction = ajv.compile(TodosSchema);
    const response = await TodoService.getAllByUserId(1)

    expect(response.status).toBe(200)
    const isValid = validateFunction(response.data);

    expect(validateFunction.errors).toStrictEqual(null);
    expect(isValid).toBe(true);
  })

  it('Should correct add new todo', async () => {
    const validateFunction = ajv.compile(TodoSchema);
    const newTodo = TodoFixture.createTodo(5)
    const response = await TodoService.add(newTodo)
    expect(response.status).toBe(201)
    expect(response.data).toMatchObject(newTodo)

    const isValid = validateFunction(response.data);
    expect(validateFunction.errors).toStrictEqual(null);
    expect(isValid).toBe(true);
  })

  it('Should correct update todo', async () => {
    const validateFunction = ajv.compile(TodoSchema);
    const todoId = 5
    const data = {
      todo: faker.word.words(5)
    }

    const response = await TodoService.update(todoId, data)
    expect(response.status).toBe(200)

    const isValid = validateFunction(response.data);
    expect(validateFunction.errors).toStrictEqual(null);
    expect(isValid).toBe(true);
  })

})
