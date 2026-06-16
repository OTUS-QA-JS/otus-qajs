import { RecipeSchema, RecipeService } from '../../framework'

describe('Recipe', () => {
  it('Should return a recipe', async () => {
    const response = await RecipeService.get(1)
    expect(response.status).toBe(200)
    expect(response.data).toMatchSchema(RecipeSchema)
  })
})
