import clients from './client'

const client = clients.clientDummyjson

const getRecipes = async ({
  limit,
  skip,
  select,
  sortBy,
  order
}: any) => {
  const response = await client.get('/recipes', {
    params: {
      limit,
      skip,
      select,
      sortBy,
      order
    }
  })

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const getRecipe = async (id: any) => {
  const response = await client.get(`/recipes/${id}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const searchRecipes = async (query: any) => {
  const response = await client.get('/recipes/search', {
    params: {
      q: query
    }
  })

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const getAllRecipesTags = async () => {
  const response = await client.get('/recipes/tags')

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const getRecipesByTag = async (tag: any) => {
  const response = await client.get(`/recipes/tag/${tag}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const getRecipesByMeal = async (meal: any) => {
  const response = await client.get(`/recipes/meal-type/${meal}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

export default {
  getAll: getRecipes,
  get: getRecipe,
  search: searchRecipes,
  getAllByTags: getAllRecipesTags,
  getByTag: getRecipesByTag,
  getByMeal: getRecipesByMeal
}
