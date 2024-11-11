export const RecipeSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    name: {
      type: 'string'
    },
    ingredients: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    instructions: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    prepTimeMinutes: {
      type: 'number'
    },
    cookTimeMinutes: {
      type: 'number'
    },
    servings: {
      type: 'number'
    },
    difficulty: {
      type: 'string',
      enum: ['Easy']
    },
    cuisine: {
      type: 'string'
    },
    caloriesPerServing: {
      type: 'number'
    },
    tags: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    userId: {
      type: 'integer'
    },
    image: {
      type: 'string'
    },
    rating: {
      type: 'number',
      minimum: 1,
      maximum: 5
    },
    reviewCount: {
      type: 'integer'
    },
    mealType: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: [
    'id',
    'name',
    'ingredients',
    'instructions',
    'prepTimeMinutes',
    'cookTimeMinutes',
    'servings',
    'difficulty',
    'cuisine',
    'caloriesPerServing',
    'tags',
    'userId',
    'image',
    'rating',
    'reviewCount',
    'mealType'
  ],
  additionalProperties: false
}
