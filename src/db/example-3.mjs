import { createClient } from './client.mjs'
const client = createClient()

await client.connect()

const query = {
  text: 'SELECT * FROM airports WHERE city = $1;',
  values: ['Москва']
}

const result = await client.query(query)
console.log(result.rows)

await client.end()
