// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'teacher'.
const teacher = {
  id: 10,
  name: 'Damir Rysaev',
  isActive: true,
  roles: ['teacher', 'mentor'],
  social: {
    x: 'https://twitter.com/user',
    vk: 'https://vk.com/user'
  }
}

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'student'.
const student = {
  id: 212,
  name: 'Jon Snow',
  isActive: true,
  roles: ['student'],
  social: {}
}

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'badUser'.
const badUser = {
  id: 343,
  name: 'My Bot',
  isActive: false
}

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'users'.
const users = [teacher, student, badUser]

const getUserName = ({ name = 'Аноним' } = {}) => {
  return name
}
console.log('teacher.name', getUserName(teacher))
console.log('{ id: 101 }.name', getUserName({}))
console.log('{}.name', getUserName({}))
console.log('undefined', getUserName())

// деструктуризация
const [firstUser, ...alsoUsers] = users
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'name'.
const { name = 'Аноним', otherField = 'default value', ...userFields } = firstUser
console.log('{ name, otherField }', {
  name,
  otherField
})
console.log('userFields', userFields)

console.log('alsoUsers', alsoUsers)

/**
 * Это только для примера
 */
;(async () => {
  const request = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: [] })
      }, 100)
      // reject(new Error('Ошибка'))
    })
  }
  const response = await request()
  console.log(response)
})()
