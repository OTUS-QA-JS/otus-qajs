/**
 * Строки
 */
{
  console.group('Строки')
  // prettier-ignore
  const a = "строка"
  console.log('typeof "строка"', typeof a)
  const b = 'тоже строка'
  /**
   * обратите внимание, что символ (') внутри строки (')
   * экранирован с помощью \
   */
  console.log("typeof 'тоже строка'", typeof b)
  const c = `шаблонная строка oO`
  console.log('typeof c', typeof c)
  console.groupEnd()

  // console.log('- '_' - ') // не работает
  console.log("- '_' - ") // - '_' -
}

/**
 * Boolean
 */
{
  console.group('Boolean')
  console.log('true', true)
  console.log('false', true)

  const a = 0
  const b = 0
  const c = 1
  const d = '1'
  const e = '1'

  console.log(`${a} === ${b}`, a === b)
  // eslint-disable-next-line
    console.log(`${a} == ${b}`, a == b)

  console.log(`${b} === ${c}`, b === c)
  // eslint-disable-next-line
    console.log(`${b} == ${c}`, b == c)

  console.log(`${c} === ${d}`, c === d)
  // eslint-disable-next-line
    console.log(`${c} == ${d}`, c == d)

  console.log(`${d} === ${e}`, d === e)
  // eslint-disable-next-line
    console.log(`${d} == ${e}`, d == e)
  console.groupEnd()
}

/**
 * Number
 */
{
  console.group('Number')
  const a = 1
  const b = 2
  console.log('typeof 1 is', typeof a)
  console.log('typeof 2 is', typeof 2)
  console.log('typeof NaN is', typeof NaN)
  console.log('typeof Infinity is', typeof Infinity)

  console.log(`${a} + ${b} = `, a + b)
  console.log(`${a} - ${b} = `, a - b)
  console.log(`${a} * ${b} = `, a * b)
  console.log(`${a} / ${b} = `, a / b)
  console.log(`${a} / 0 = `, a / 0)
  console.log(`${a} % ${b} = `, a % b)
  console.log(`${a} ** ${b} = `, a ** b)
  console.groupEnd()
}

/**
 * null / undefined
 */
{
  console.group('null / undefined')
  let a
  const b = null
  const c = undefined
  console.log('undefined null undefined')
  console.log(a, b, c)
  console.groupEnd()
}

/**
 * let, const
 */
{
  // переменная которую можно переопределить
  let a = 1
  // переменная которую нельзя переопределить
  const b = 2

  console.group('let, const')
  console.log(`let a = ${a}`)
  a = 10
  console.log(`a = 10`)
  console.log(`a is ${a}`)

  // строчка ниже выдаст ошибку
  // b = 10
  console.log(`let b = ${b}`)
  console.groupEnd()
}

/**
 * Шаблонные строки
 */
{
  console.group('template string')
  const a = 10
  // подставка переменной в обычную строку
  console.log('a is ' + a + '.') // a is 10.
  // в шаблонную строку
  console.log(`a is ${a}.`) // a is 10
  console.groupEnd()
}
