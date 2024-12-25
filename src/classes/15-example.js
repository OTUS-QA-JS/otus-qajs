class Other {
  token = '123'

  read = 'only read'

  get onlyRead() {
    return this.read
  }

  set onlyRead(value) {
    console.log('this.onlyRead', this.onlyRead)
    console.log('set', value)
    this.read = value
  }

  printRead() {
    console.log('printRead', this.read)
  }

  // eslint-disable-next-line
  get name() {}

  // eslint-disable-next-line
  set name(value) {}
}

const other = new Other()

console.log(other.onlyRead) // undefined
other.onlyRead = '123123'
console.log(other.onlyRead) // undefined
other.printRead() // '123123'

// // getter
// console.log(other.token)
//
// // setter
// other.token = '321'
//
// // getter
// console.log(other.token)
