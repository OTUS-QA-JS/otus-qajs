import { createClient } from './client.mjs'
const client = createClient()

await client.connect()

const response = await client.query('SELECT 1;')

// console.log(response);
console.log(response.rows)

await client.end()
