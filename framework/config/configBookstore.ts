import 'dotenv/config'

// Object.freeze используем, чтобы запретить изменять конфиг,
// конфиг только для чтения
export default Object.freeze({
  // если хотим задать значения по-умолчанию, можно использовать оператор ??
  baseURL: process.env.TEST_BOOKSTORE_API_URL ?? 'https://bookstore.demoqa.com',
  userId: process.env.TEST_BOOKSTORE_USER_ID as string,
  username: process.env.TEST_BOOKSTORE_USERNAME as string,
  password: process.env.TEST_BOOKSTORE_PASSWORD as string
})
