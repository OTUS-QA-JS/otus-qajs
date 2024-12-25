// eslint-disable-next-line
class Service {
  // не было добавлено в this
  static created = false

  // this
  static hello() {
    console.log(MyClass.created)
    // this
  }

  constructor() {
    if (MyClass.created) {
      console.warn('Был создан ранее')
      throw new Error('Был создан ранее')
    }
    MyClass.created = true
  }

  isCreated() {
    // @ts-expect-error FIXME
    return this.created
  }
}

const myClass1 = new MyClass()
const myClass2 = new MyClass()
const myClass3 = new MyClass()

console.log(myClass1)
console.log(myClass2)
console.log(myClass3)
