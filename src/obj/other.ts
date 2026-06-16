interface User {
  id: number
  name: string
  isActive: boolean
  roles?: string[]
  social?: Record<string, string>
  otherField?: string
}

const teacher: User = {
  id: 10,
  name: 'Damir Rysaev',
  isActive: true,
  roles: ['teacher', 'mentor'],
  social: {
    x: 'https://twitter.com/user',
    vk: 'https://vk.com/user'
  }
}

const student: User = {
  id: 212,
  name: 'Jon Snow',
  isActive: true,
  roles: ['student'],
  social: {}
}

const badUser: User = {
  id: 343,
  name: 'My Bot',
  isActive: false
}

const users: User[] = [teacher, student, badUser]

const getUserName = ({ name = 'Аноним' }: { name?: string } = {}) => {
  return name
}
console.log('teacher.name', getUserName(teacher))
console.log('{ id: 101 }.name', getUserName({}))
console.log('{}.name', getUserName({}))
console.log('undefined', getUserName())

// деструктуризация
const [firstUser, ...alsoUsers] = users
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

export {}
