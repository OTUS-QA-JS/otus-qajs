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

console.log('-----')

if ('name' in teacher) {
  console.log('Teacher has name: ', teacher.name)
}

console.log('delete teacher name')
// @ts-expect-error TS(2790): The operand of a 'delete' operator must be optiona... Remove this comment to see the full error message
delete teacher.name

if (!('name' in teacher)) {
  console.log("Teacher doesn't have name")
}

console.log('-----')

if (nameField in student) {
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  console.log('Student has name: ', student[nameField])
}

console.log('delete student name')
// @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
delete student[nameField]

if (!('name' in student)) {
  console.log("Student doesn't have name")
}

console.log('-----')

console.group('Teacher fields')
for (const key in teacher) {
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  console.log(`type ${key} is ${typeof teacher[key]}`)
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  console.log(`value ${key} is`, teacher[key])
}
console.groupEnd()

console.group('Student fields')
for (const key in student) {
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  console.log(`type ${key} is ${typeof student[key]}`)
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  console.log(`value ${key} is`, student[key])
}
console.groupEnd()
