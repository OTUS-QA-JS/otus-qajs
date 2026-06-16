import { JSONSchemaType } from 'ajv'
import { Todo } from '../models/Todo'

export const TodoSchema: JSONSchemaType<Todo> = {
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
