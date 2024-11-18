import { calculateTotal } from '../src/discount'

describe('calculateTotal', () => {
  const validCases = [
    {
      name: 'valid discount of 10%',
      products: [
        { name: 'Product1', quantity: 3, price: 10 },
        { name: 'Product2', quantity: 5, price: 5 }
      ],
      discount: 10,
      expected: { totalWithoutDiscount: 55, totalWithDiscount: 49.5 }
    },
    {
      name: 'no discount applied',
      products: [
        { name: 'Product1', quantity: 3, price: 10 },
        { name: 'Product2', quantity: 5, price: 4 }
      ],
      discount: 0,
      expected: { totalWithoutDiscount: 50, totalWithDiscount: 50 }
    }
  ]

  test.each(validCases)('%s', ({ products, discount, expected }) => {
    const result = calculateTotal(products, discount)
    expect(result).toEqual(expected)
  })

  const invalidCases = [
    {
      name: 'negative discount',
      products: [
        { name: 'Product1', quantity: 3, price: 10 },
        { name: 'Product2', quantity: 5, price: 10 }
      ],
      discount: -10,
      error: 'Скидка не может быть отрицательным числом.'
    },
    {
      name: 'discount over 100%',
      products: [
        { name: 'Product1', quantity: 3, price: 10 },
        { name: 'Product2', quantity: 5, price: 10 }
      ],
      discount: 110,
      error: 'Скидка не может быть больше 100%.'
    }
  ]

  test.each(invalidCases)('%s', ({ products, discount, error }) => {
    expect(() => calculateTotal(products, discount)).toThrow(error)
  })
})
