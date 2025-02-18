import { QuoteService } from '../../framework'
import Ajv from 'ajv'

const ajv = new Ajv()

const quoteSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    quote: { type: 'string' },
    author: { type: 'string' }
  },
  required: ['id', 'quote', 'author'],
  additionalProperties: false
}

const quoteValidate = ajv.compile(quoteSchema)

describe('Quote', () => {
  it('Should return a quote', async () => {
    const response = await QuoteService.get(1)
    expect(response.status).toBe(200)
    expect(response.data).toStrictEqual({
      id: 1,
      quote: 'Your heart is the size of an ocean. Go find yourself in its hidden depths.',
      author: 'Rumi'
    })
  })

  it('Should return 404 if quote not exits', async () => {
    const response = await QuoteService.get(10_000)
    expect(response.status).toBe(404)
    expect(response.data).toStrictEqual({
      message: "Quote with id '10000' not found"
    })
  })

  it('Should return a random quote', async () => {
    const response1 = await QuoteService.getRandom()
    expect(response1.status).toBe(200)
    const isValid1 = quoteValidate(response1.data)
    expect(quoteValidate.errors).toStrictEqual(null)
    expect(isValid1).toBe(true)

    const response2 = await QuoteService.getRandom()
    expect(response2.status).toBe(200)
    expect(quoteValidate(response2.data)).toBe(true)

    expect(response1.data).not.toStrictEqual(response2.data)
  })
})
