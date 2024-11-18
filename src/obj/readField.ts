// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'nameField'... Remove this comment to see the full error message
let nameField = 'name'
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'socialFiel... Remove this comment to see the full error message
let socialField = 'social'

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'teacher'.
const teacher = {
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

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'student'.
const student = {
  id: 2,
  [nameField]: 'Jon Snow',
  isActive: true,
  roles: ['student'],
  [socialField]: {}
}

console.log('teacher name: ', teacher.name)
// @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
console.log('student name: ', student[nameField])
