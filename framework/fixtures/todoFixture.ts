import { faker } from '@faker-js/faker'

export const createTodo = (userId: number) => {
  return {
    todo: faker.word.words(5),
    completed: faker.datatype.boolean(),
    userId
  }
}
