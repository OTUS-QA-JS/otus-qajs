type DynamicField = string | number | boolean | string[] | Record<string, string> | undefined

interface DynamicUser {
  id: number
  name?: string
  isActive: boolean
  roles: string[]
  social?: Record<string, string>
  [key: string]: DynamicField
}

let nameField = 'name'
let socialField = 'social'

const teacher: DynamicUser = {
  id: 1,
  [nameField]: 'Damir Rysaev',
  isActive: true,
  roles: ['teacher', 'mentor'],
  [socialField]: {
    x: 'https://twitter.com/user',
    vk: 'https://vk.com/user'
  }
}

nameField = 'user name'
socialField = 'social networks'

const student: DynamicUser = {
  id: 2,
  [nameField]: 'Jon Snow',
  isActive: true,
  roles: ['student'],
  [socialField]: {}
}

console.log(teacher)
console.log(student)

export {}
