class MyClass {
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

const myClass01 = new MyClass()
const myClass02 = new MyClass()
const myClass03 = new MyClass()

console.log(myClass01)
console.log(myClass02)
console.log(myClass03)
