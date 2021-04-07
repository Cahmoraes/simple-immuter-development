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

const newState = si.produce(person, draftState => {
  draftState._age = 27
  draftState.getAge = function () {
    return this._age
  }
})

log(person === newState) // false
log(newState.getAge()) // 27
log(newState.getName()) // caique
log(newState.getSex()) // masculino
