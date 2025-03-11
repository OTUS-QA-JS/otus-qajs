import { createClient } from './client.mjs'
const client = createClient()

try {
  await client.connect()

  const faultyQuery = 'SELECT * FROM non_existing_table;'
  const result = await client.query(faultyQuery)
  console.log(result.rows)
} catch (error) {
  console.error('Error occurred:', error.message)
} finally {
  await client.end()
}
