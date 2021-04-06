import { si } from './src/si.js'

const log = (...args) => console.log(...args)

class Human {
  constructor (sex) {
    this._sex = sex
  }

  getSex () {
    return this._sex
  }
}

class Person extends Human {
  constructor (name, sex) {
    super(sex)
    this._name = name
  }

  getName () {
    return this._name
  }
}

const person = new Person('caique', 'masculino')

const newState = si.produce(person)

log(newState.getSex())