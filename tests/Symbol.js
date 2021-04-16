import { si } from '../src/si.js'

const log = (...args) => console.log(...args)

const nameSymbol = Symbol('name')
const obj = {
  [nameSymbol]: 'John',
  age: 30,
  *[Symbol.iterator] () {
    yield this[nameSymbol]
    yield this.age
  },
  [Symbol.toPrimitive] (coercionType) {
    return this.age
  }
}

const nextState = si.produce(obj)
log([...nextState]) // [ 'John', 30 ]
log(Number(nextState)) // 30