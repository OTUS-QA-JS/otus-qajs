/**
 * Рассчитывает общую стоимость товаров с учётом и без учёта скидки.
 *
 * @param {Array<{ price: number, quantity: number }>} products - Массив объектов товаров, каждый из которых содержит цену и количество.
 * @param {number} discount - Скидка в процентах (от 0 до 100).
 * @returns {{ totalWithoutDiscount: number, totalWithDiscount: number }} Объект с общей суммой без скидки и с учётом скидки.
 * @throws {Error} Если скидка меньше 0 или больше 100, или если данные товаров некорректны.
 *
 * @example
 * const products = [
 *   { price: 100, quantity: 2 },
 *   { price: 50, quantity: 1 }
 * ];
 * const discount = 10;
 * const result = calculateTotal(products, discount);
 * console.log(result);
 * // Output: { totalWithoutDiscount: 250, totalWithDiscount: 225 }
 */
interface Product {
  price: number
  quantity: number
}
export function calculateTotal(products: Product[], discount?: number) {
  // Проверка на корректность скидки
  if (typeof discount !== 'number' || discount < 0) {
    throw new Error('Скидка не может быть отрицательным числом.')
  }

  if (discount > 100) {
    throw new Error('Скидка не может быть больше 100%.')
  }

  // Проверка корректности данных товаров
  if (
    !Array.isArray(products) ||
    products.some(p => typeof p.price !== 'number' || typeof p.quantity !== 'number' || p.price < 0 || p.quantity < 0)
  ) {
    throw new Error('Неверные данные товаров. Убедитесь, что цена и количество являются положительными числами.')
  }

  // Рассчитываем сумму товаров без скидки и с учётом скидки
  const totalWithoutDiscount = products.reduce((acc, product) => acc + product.quantity * product.price, 0)
  const totalWithDiscount = totalWithoutDiscount * (1 - discount / 100)

  return {
    totalWithoutDiscount,
    totalWithDiscount
  }
}
