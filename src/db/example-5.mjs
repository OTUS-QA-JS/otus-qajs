import { createClient } from './client.mjs'
const client = createClient()

await client.connect()

const getAirportsByCity = async city => {
  const query = {
    text: 'SELECT airport_name, city FROM airports WHERE city LIKE $1;',
    values: [`%${city}`]
  }

  const result = await client.query(query)

  return result.rows
}

console.log('Аэропорты в городах с окончанием ва')
console.log(await getAirportsByCity('ва'))
console.log('---')
console.log('Аэропорты в городах с окончанием бург')
console.log(await getAirportsByCity('бург'))
console.log('---')
console.log('Аэропорты в городах с окончанием дар')
console.log(await getAirportsByCity('во'))

await client.end()
