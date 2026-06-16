import clients from './client'
import { Recipe } from '../models/Recipe'

const client = clients.clientDummyjson

const getRecipes = async ({
  limit,
  skip,
  select,
  sortBy,
  order
}: {
  limit?: number
  skip?: number
  select?: string
  sortBy?: string
  order?: string
}) => {
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
    data: response.data as Recipe[]
  }
}

const getRecipe = async (id: number) => {
  const response = await client.get(`/recipes/${id}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const searchRecipes = async (query: string) => {
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

const getRecipesByTag = async (tag: string) => {
  const response = await client.get(`/recipes/tag/${tag}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const getRecipesByMeal = async (meal: string) => {
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
