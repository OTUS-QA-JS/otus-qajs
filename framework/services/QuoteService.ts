import clients from './client'

const client = clients.clientDummyjson

const getAllQuotes = async ({ limit, skip }: { limit?: number; skip?: number }) => {
  const response = await client.get('/quotes', {
    params: {
      limit,
      skip
    }
  })

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const getQuote = async (id: number) => {
  const response = await client.get(`/quotes/${id}`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

const getRandomQuote = async () => {
  const response = await client.get(`/quotes/random`)

  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  }
}

export default {
  getAll: getAllQuotes,
  get: getQuote,
  getRandom: getRandomQuote
}
