export function kolobok(character) {
  switch (character) {
    case 'дедушка':
      return 'Я от дедушки ушёл'
    case 'заяц':
      return 'Я от зайца ушёл'
    case 'лиса':
      return 'Меня съели'
    default:
      return 'Я встретил кого-то неизвестного'
  }
}

export function newYear(character) {
  switch (character) {
    case 'Дед Мороз':
    case 'Снегурочка':
      return `${character}! ${character}! ${character}!`
    default:
      return 'Неизвестный персонаж'
  }
}
