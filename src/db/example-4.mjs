import { createClient } from './client.mjs'
const client = createClient()

await client.connect()

const getAirportsByCity = async city => {
  const query = {
    text: 'SELECT * FROM airports WHERE city = $1;',
    values: [city]
  }

  const result = await client.query(query)

  return result.rows
}

console.log('Аэропорты Москвы')
console.log(await getAirportsByCity('Москва'))
console.log('---')
console.log('Аэропорты Оренбурга')
console.log(await getAirportsByCity('Оренбург'))

await client.end()
