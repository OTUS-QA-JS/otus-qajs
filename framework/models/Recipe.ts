import { RecipeSchema } from '../schemas'
import { JTDDataType } from 'ajv/dist/jtd'

export type Recipe = JTDDataType<typeof RecipeSchema>
