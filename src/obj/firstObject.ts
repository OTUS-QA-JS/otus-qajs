interface User {
  id: number
  name: string
  isActive: boolean
  roles: string[]
  social: Record<string, string>
}

const teacher: User = {
  id: 1,
  name: 'Damir Rysaev',
  isActive: true,
  roles: ['teacher', 'mentor'],
  social: {
    x: 'https://twitter.com/user',
    vk: 'https://vk.com/user'
  }
}

console.log(teacher)

export {}
