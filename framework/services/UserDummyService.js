import clients from './client'

const client = clients.clientDummyjson

const getUsers = async () => {
  const response = await client.get('/users')

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

export default {
  getAll: getUsers
}

// fetch('https://dummyjson.com/users/1')
//   .then(res => res.json())
//   .then(console.log);
//
// fetch('https://dummyjson.com/users/search?q=John')
//   .then(res => res.json())
//   .then(console.log);
//
// fetch('https://dummyjson.com/users/filter?key=hair.color&value=Brown')
//   .then(res => res.json())
//   .then(console.log);
