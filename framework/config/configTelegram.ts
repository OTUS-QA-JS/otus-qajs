export default Object.freeze({
  enable: process.env.TEST_TELEGRAM_ENABLE === 'true',
  token: process.env.TEST_TELEGRAM_TOKEN as string,
  chatId: process.env.TEST_TELEGRAM_CHAT_ID as string
})
